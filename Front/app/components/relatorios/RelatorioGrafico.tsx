import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, useWindowDimensions } from 'react-native';
import { PieChart, BarChart } from 'react-native-chart-kit';
import { RelatorioContext } from '@/contexts/RelatorioContext';
import axios from 'axios';
import { AuthContext } from '@/contexts/Auth';

type Relatorio = {
  totalTasks: number;
  EM_ANDAMENTO: number;
  CONCLUIDA: number;
  NAO_ENTREGUE: number;
};

const Chart = () => {
  const { width, height } = useWindowDimensions();
  const { filter, filterForma } = useContext(RelatorioContext);
  const [data, setData] = useState<Relatorio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const relatorioData = await axios.get('http://localhost:3000/api/taskDepartamentStatus', {
          params: { departamento: filter, id_empresa: authContext.authData?.id_empresa }
        });
        setData(relatorioData.data.taskCounts);
      } catch (error) {
        console.error('Erro ao buscar dados do relatório:', error);
        setError('Erro ao carregar dados, tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filter]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  const chartData = [
    {
      name: 'Entregue',
      population: data?.CONCLUIDA || 0,
      color: '#4caf50',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Não Entregue',
      population: data?.NAO_ENTREGUE || 0,
      color: '#f44336',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Em Dev',
      population: data?.EM_ANDAMENTO || 0,
      color: '#2196f3',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  const chartWidth = width < 768 ? width * 0.8 : width * 0.4;
  const chartHeight = width >= 768 ? height * 0.5 : height * 0.3;

  return (
    <View style={styles.chartContainer}>
    {filterForma === 'Pizza' ? (
      data?.totalTasks === 0 ? (
        <Text style={styles.noTasksText}>Sem tasks até o momento...</Text>
      ) : (
        <View style={styles.chartWrapper}>
          <PieChart
            data={chartData}
            width={chartWidth}
            hasLegend={false}
            height={chartHeight}
            center={[50, 10]}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
          <View style={styles.legendContainer}>
            {chartData.map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: item.color }]} />
                <Text style={styles.legendText}>{item.name}: {item.population}</Text>
              </View>
            ))}
          </View>
        </View>
      )
    ) : (
      <View style={styles.chartWrapper}>
        <BarChart
          data={{
            labels: chartData.map(item => item.name),
            datasets: [
              {
                data: chartData.map(item => item.population),
              },
            ],
          }}
          width={chartWidth}
          height={chartHeight}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          yAxisLabel=""
          yAxisSuffix=""
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    )}
  </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    padding: 20,
  },
  chartWrapper: {
    alignItems: 'center',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    flexWrap: 'wrap',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
  legendColor: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  legendText: {
    fontSize: 15,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  noTasksText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Chart;
