import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import * as dbHelper from '../db/dbHelper';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: '#f8d7da',
  backgroundGradientTo: '#f8d7da',
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
  const [selectedChart, setSelectedChart] = useState<string>('steps');
  const [chartData, setChartData] = useState<ChartData>({
    labels: ['N/A'],
    datasets: [{ data: [0] }],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    addTestDataToDatabase();  // Добавляем тестовые данные в базу данных
    loadChartData('steps');  // Загружаем данные для выбранного графика
  }, []);

  // Добавляем тестовые данные в базу
  const addTestDataToDatabase = async () => {
    try {
      const dateId = 1;  // Например, ID даты
      await dbHelper.addStepsData('8000', dateId);
      await dbHelper.addStepsData('12000', dateId);
      await dbHelper.addStepsData('14000', dateId);
      await dbHelper.addHeartRate('70', dateId);
      await dbHelper.addHeartRate('69', dateId)
      await dbHelper.addHeartRate('75', dateId)
      await dbHelper.addHeartRate('73', dateId)

    } catch (error) {
      console.error('Ошибка при добавлении тестовых данных:', error);
    }
  };

  const loadChartData = async (chartType: string) => {
    try {
      setLoading(true);
      setErrorMessage('');
      setSelectedChart(chartType);  // Обновляем состояние выбранного графика
  
      let data: any = [];
      let labels: string[] = [];
  
      const dateId = 1;  // Пример ID даты, измените в зависимости от нужд
  
      switch (chartType) {
        case 'steps':
          // Обновленный запрос для получения данных шагов с датами
          data = await dbHelper.getStepsWithDates(dateId);
          labels = data.map((row: any) => row.date);
          setChartData({
            labels,
            datasets: [{ data: data.map((row: any) => parseFloat(row.steps || '0')) }],
          });
          break;
        case 'heart_rate':
          data = await dbHelper.getHeartRateWithDates(dateId);
          labels = data.map((row: any) => row.date ? row.date : 'N/A');
          setChartData({
            labels,
            datasets: [{ data: data.map((row: any) => parseFloat(row.heart_rate || '0')) }],
          });
          break;
        case 'sleep':
          data = await dbHelper.getSleepingHoursWithDates(dateId);
          labels = data.map((row: any) => row.date ? row.date : 'N/A');
          setChartData({
            labels,
            datasets: [{ data: data.map((row: any) => parseFloat(row.hours || '0')) }],
          });
          break;
        case 'weight':
          data = await dbHelper.getWeightWithDates(dateId);
          labels = data.map((row: any) => row.date ? row.date : 'N/A');
          setChartData({
            labels,
            datasets: [{ data: data.map((row: any) => parseFloat(row.weight || '0')) }],
          });
          break;
        default:
          setChartData({
            labels: ['N/A'],
            datasets: [{ data: [0] }],
          });
      }
  
      setLoading(false);
    } catch (error) {
      console.error('Ошибка при загрузке данных графика:', error);
      setErrorMessage('Произошла ошибка при загрузке данных.');
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
        <TouchableOpacity
          style={[
            styles.chartButton,
            selectedChart === 'steps' && styles.selectedButton,
          ]}
          onPress={() => loadChartData('steps')}>
          <Text
            style={[
              styles.chartButtonText,
              selectedChart === 'steps' && styles.selectedButtonText,
            ]}>
            Steps
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.chartButton,
            selectedChart === 'heart_rate' && styles.selectedButton,
          ]}
          onPress={() => loadChartData('heart_rate')}>
          <Text
            style={[
              styles.chartButtonText,
              selectedChart === 'heart_rate' && styles.selectedButtonText,
            ]}>
            Heart Rate
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.chartButton,
            selectedChart === 'sleep' && styles.selectedButton,
          ]}
          onPress={() => loadChartData('sleep')}>
          <Text
            style={[
              styles.chartButtonText,
              selectedChart === 'sleep' && styles.selectedButtonText,
            ]}>
            Sleep
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.chartButton,
            selectedChart === 'weight' && styles.selectedButton,
          ]}
          onPress={() => loadChartData('weight')}>
          <Text
            style={[
              styles.chartButtonText,
              selectedChart === 'weight' && styles.selectedButtonText,
            ]}>
            Weight
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>Health Analytics</Text>
        {renderChart()}
        {renderChartButtons()}
        {errorMessage && <Text>{errorMessage}</Text>}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8d7da',
  },
  scrollViewContent: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chartButtonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  chartButton: {
    backgroundColor: '#f8d7da',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    margin: 5,
    elevation: 5,
  },
  selectedButton: {
    backgroundColor: '#28a745',  // Цвет фона для выбранной кнопки
  },
  chartButtonText: {
    fontSize: 16,
    color: '#000',
  },
  selectedButtonText: {
    color: '#fff',  // Цвет текста для выбранной кнопки
  },
});

export default AnalysesScreen;
