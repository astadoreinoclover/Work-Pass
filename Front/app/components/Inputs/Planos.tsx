import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";

const planos = [
  { id: 0, nome: "Básico", valor: "R$ 100,00", beneficios: ['Cadastro de funcionários e tarefas.', 'Gráfico de entregas.', 'Tabela mensal de desempenho.', 'Funcionalidades para adicionar skills e interesses de novas funções.'] },
  { id: 1, nome: "Básico Anual", valor: "R$ 1080,00", beneficios: ['Inclui todas as funcionalidades da assinatura mensal.', 'Desconto de 10% no valor da assinatura.'] },
  { id: 2, nome: "Premium", valor: "R$ 200,00", beneficios: ['Inclui todas as funcionalidades da assinatura mensal.', 'Gráfico de entregas mais detalhado e com relatório.', 'Tabela de desempenho semanal, mensal e anual.'] },
  { id: 3, nome: "Premium Anual", valor: "R$ 2160,00", beneficios: ['Inclui todas as funcionalidades da assinatura mensal premium.', 'Desconto de 10% no valor da assinatura.'] },
];

export default function PlanosExpansiveis({ onSelecionarPlano }: { onSelecionarPlano: (id: number | null) => void }) {
  const [planoSelecionado, setPlanoSelecionado] = useState<number | null>(null);
  const [expandido, setExpandido] = useState<number | null>(null);

  const selecionarPlano = (id: number) => {
    setPlanoSelecionado(id === planoSelecionado ? null : id);
    onSelecionarPlano(id === planoSelecionado ? null : id);
  };

  const alternarExpansao = (id: number) => {
    setExpandido(expandido === id ? null : id);
  };

  return (
    <FlatList
      data={planos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          {/* Cabeçalho do Card */}
          <TouchableOpacity onPress={() => alternarExpansao(item.id)} style={styles.header}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.valor}>{item.valor}</Text>

            {/* Checkbox personalizado */}
            <TouchableOpacity
              style={[styles.checkbox, planoSelecionado === item.id && styles.checkboxAtivo]}
              onPress={() => selecionarPlano(item.id)}
            >
              {planoSelecionado === item.id && <Text style={styles.check}>✓</Text>}
            </TouchableOpacity>
          </TouchableOpacity>

          {/* Benefícios do Plano (expansíveis) */}
          {expandido === item.id && (
            <View style={styles.beneficios}>
              {item.beneficios.map((beneficio, index) => (
                <Text key={index} style={styles.beneficio}>• {beneficio}</Text>
              ))}
            </View>
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 3, // Sombra no Android
    shadowColor: "#000", // Sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nome: { fontSize: 18, fontWeight: "bold" },
  valor: { fontSize: 16, color: "#555" },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#555",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxAtivo: { backgroundColor: "#007bff", borderColor: "#007bff" },
  check: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  beneficios: { marginTop: 10 },
  beneficio: { fontSize: 14, color: "#333" },
});
