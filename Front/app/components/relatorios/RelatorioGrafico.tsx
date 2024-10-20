import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, useWindowDimensions } from 'react-native';
import { PieChart, BarChart } from 'react-native-chart-kit';
import { RelatorioContext } from '@/contexts/RelatorioContext';
import { getRelatorio } from '@/services/RelatorioService';

type Relatorio = {
  id: number;
  department: string;
  entregue: number;
  naoEntregue: number;
  desenvolvimento: number;
};

const Chart = () => {
  const { width, height } = useWindowDimensions();
  const { filter, filterForma } = useContext(RelatorioContext);
  const [data, setData] = useState<Relatorio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const relatorioData = await getRelatorio(filter);
        setData(relatorioData);
      } catch (error) {
        console.error('Erro ao buscar dados do relatório:', error);
        setError('Erro ao carregar dados, tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filter]);

  const chartData = [
    {
      name: 'Entregue',
      population: data.reduce((total, func) => total + func.entregue, 0),
      color: '#4caf50',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Não Entregue',
      population: data.reduce((total, func) => total + func.naoEntregue, 0),
      color: '#f44336',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Em Dev',
      population: data.reduce((total, func) => total + func.desenvolvimento, 0),
      color: '#2196f3',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  const chartWidth = width < 768 ? width * 0.8 : width * 0.4;
  const chartHeight = width >=768 ? height*0.5:height*0.3;

  return (
    <View style={styles.chartContainer}>
      {filterForma === 'Pizza' ? (
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
            // withVerticalLabels={false}
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
});

export default Chart;
