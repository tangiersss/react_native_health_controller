import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import * as dbHelper from "../db/dbHelper";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#f8d7da",
  backgroundGradientTo: "#f8d7da",
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
};

interface ChartData {
  labels: string[];
  datasets: { data: number[] }[];
}

const AnalysesScreen = () => {
  const [selectedChart, setSelectedChart] = useState<string>("steps");
  const [chartData, setChartData] = useState<ChartData>({
    labels: ["N/A"],
    datasets: [{ data: [0] }],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    // addTestDataToDatabase();
    loadChartData("steps");
  }, []);

  const addTestDataToDatabase = async () => {
    try {
      await dbHelper.addStepsData("8000", 1);
      await dbHelper.addStepsData("12000", 2);
      await dbHelper.addStepsData("14000", 3);
      await dbHelper.addHeartRate("70", 1);
      await dbHelper.addHeartRate("69", 2);
      await dbHelper.addHeartRate("75", 3);
      await dbHelper.addHeartRate("73", 4);
    } catch (error) {
      console.error("Ошибка при добавлении тестовых данных:", error);
    }
  };

  const loadChartData = async (chartType: string) => {
    try {
      setLoading(true);
      setErrorMessage("");
      setSelectedChart(chartType);

      let data: any = [];
      let labels: string[] = [];

      const dates = await dbHelper.getAllDates();

      // Массив для хранения всех данных для графика
      const allData: any[] = [];

      for (let i = 0; i < dates.length; i++) {
        const dateId = dates[i]._id;
        let chartData: any;

        // Для каждого типа данных, загружаем нужную информацию
        switch (chartType) {
          case "steps":
            chartData = await dbHelper.getStepsWithDates(dateId);
            labels.push(dates[i].date); // Добавляем дату в метки

            // Если данные есть, добавляем шаги, если нет, ставим 0
            const stepsData =
              chartData.length > 0
                ? chartData.map((row: any) => parseFloat(row.steps || "0"))
                : [0];

            data.push(...stepsData); // Добавляем шаги в массив данных

            console.log(`Steps data for ${dates[i].date}:`, stepsData); // Проверка данных
            break;

          case "heart_rate":
            chartData = await dbHelper.getHeartRateWithDates(dateId);
            labels.push(dates[i].date);
            data.push(
              ...(chartData.length > 0
                ? chartData.map((row: any) => parseFloat(row.heart_rate || "0"))
                : [0])
            );
            break;

          case "sleep":
            chartData = await dbHelper.getSleepingHoursWithDates(dateId);
            labels.push(dates[i].date);
            data.push(
              ...(chartData.length > 0
                ? chartData.map((row: any) => parseFloat(row.hours || "0"))
                : [0])
            );
            break;

          case "weight":
            chartData = await dbHelper.getWeightWithDates(dateId);
            labels.push(dates[i].date);
            data.push(
              ...(chartData.length > 0
                ? chartData.map((row: any) => parseFloat(row.weight || "0"))
                : [0])
            );
            break;

          default:
            break;
        }

        // Добавляем данные для каждой даты в общий массив
        allData.push({ label: dates[i].date, data });
      }

      console.log("Labels:", labels);
      console.log("All Data:", allData);

      setChartData({
        labels,
        datasets: allData.map((item) => ({
          label: item.label,
          data: item.data,
        })),
      });

      setLoading(false);
    } catch (error) {
      console.error("Ошибка при загрузке данных графика:", error);
      setErrorMessage("Произошла ошибка при загрузке данных.");
      setLoading(false);
    }
  };

  const renderChart = () => {
    if (loading) {
      return <Text>Загрузка...</Text>;
    }

    return (
      <BarChart
        data={chartData}
        width={screenWidth * 0.9}
        height={220}
        chartConfig={chartConfig}
        fromZero={true}
        yAxisLabel=""
        yAxisSuffix=""
      />
    );
  };

  const renderChartButtons = () => {
    return (
      <View style={styles.chartButtonContainer}>
        <View style={styles.buttonColumn}>
          <TouchableOpacity
            style={[
              styles.chartButton,
              selectedChart === "steps" && styles.selectedButton,
            ]}
            onPress={() => loadChartData("steps")}
          >
            <Text
              style={[
                styles.chartButtonText,
                selectedChart === "steps" && styles.selectedButtonText,
              ]}
            >
              Steps
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.chartButton,
              selectedChart === "heart_rate" && styles.selectedButton,
            ]}
            onPress={() => loadChartData("heart_rate")}
          >
            <Text
              style={[
                styles.chartButtonText,
                selectedChart === "heart_rate" && styles.selectedButtonText,
              ]}
            >
              Heart Rate
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonColumn}>
          <TouchableOpacity
            style={[
              styles.chartButton,
              selectedChart === "sleep" && styles.selectedButton,
            ]}
            onPress={() => loadChartData("sleep")}
          >
            <Text
              style={[
                styles.chartButtonText,
                selectedChart === "sleep" && styles.selectedButtonText,
              ]}
            >
              Sleep
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.chartButton,
              selectedChart === "weight" && styles.selectedButton,
            ]}
            onPress={() => loadChartData("weight")}
          >
            <Text
              style={[
                styles.chartButtonText,
                selectedChart === "weight" && styles.selectedButtonText,
              ]}
            >
              Weight
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.appBar}>
          <Image
            source={require("../assets/main_icon.png")}
            style={styles.appBarImage}
          />
        </View>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {renderChart()}
          {renderChartButtons()}
          {errorMessage && <Text>{errorMessage}</Text>}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8d7da",
    paddingTop: 50,
  },
  appBar: {
    height: 60,
    backgroundColor: "#765D60",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    position: "absolute",
    top: 0,
    zIndex: 1,
    paddingHorizontal: 10,
  },
  appBarImage: {
    width: 35,
    height: 35,
  },
  scrollViewContent: {
    paddingVertical: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  chartButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
    width: "100%",
  },
  buttonColumn: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  chartButton: {
    backgroundColor: "#FF5F6D",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    margin: 5,
    width: screenWidth * 0.4,
    alignItems: "center",
  },
  chartButtonText: {
    fontSize: 16,
    color: "white",
  },
  selectedButton: {
    backgroundColor: "white",
  },
  selectedButtonText: {
    color: "#ff5f6d",
  },
});

export default AnalysesScreen;
