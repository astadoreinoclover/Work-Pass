import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

type PasswordDefinitionProps = {
  senha: {
    senha: string;
    confirmacao: string;
  };
  setSenha: React.Dispatch<React.SetStateAction<{
    senha: string;
    confirmacao: string;
  }>>;
};

const PasswordDefinition: React.FC<PasswordDefinitionProps> = ({ senha, setSenha }) => {
  const [requisitos, setRequisitos] = useState({
    maiuscula: false,
    minuscula: false,
    numero: false,
    caractereEspecial: false,
  });
  const [senhasIguais, setSenhasIguais] = useState(false);
  const [tamanho, setTamanho] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisibleConf, setIsPasswordVisibleConf] = useState(false);

  const validarRequisitos = (senha: string) => {
    const maiuscula = /[A-Z]/.test(senha);
    const minuscula = /[a-z]/.test(senha);
    const numero = /\d/.test(senha);
    const caractereEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);

    setRequisitos({ maiuscula, minuscula, numero, caractereEspecial });
    setTamanho(senha.length >= 8);

    return maiuscula && minuscula && numero && caractereEspecial;
  };

  const handlePasswordChange = (value: string) => {
    setSenha((prev) => ({ ...prev, senha: value }));
    if (validarRequisitos(value)) {
      validarSenhas(value, senha.confirmacao);
    } else {
      setSenhasIguais(false);
    }
  };

  const handleConfirmacaoChange = (value: string) => {
    setSenha((prev) => ({ ...prev, confirmacao: value }));
    if (validarRequisitos(senha.senha)) {
      validarSenhas(senha.senha, value);
    } else {
      setSenhasIguais(false);
    }
  };

  const validarSenhas = (senha: string, confirmacao: string) => {
    setSenhasIguais(senha === confirmacao);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Definição de Senha</Text>

      <Text style={styles.label}>Senha</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={!isPasswordVisible}
          placeholder="Digite sua senha"
          placeholderTextColor="#ccc"
          value={senha.senha}
          onChangeText={handlePasswordChange}
        />
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Text style={styles.emoji}>{isPasswordVisible ? "👁️" : "🙈"}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Confirme sua senha</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={!isPasswordVisibleConf}
          placeholder="Confirme sua senha"
          placeholderTextColor="#ccc"
          value={senha.confirmacao}
          onChangeText={handleConfirmacaoChange}
        />
        <TouchableOpacity onPress={() => setIsPasswordVisibleConf(!isPasswordVisibleConf)}>
          <Text style={styles.emoji}>{isPasswordVisibleConf ? "👁️" : "🙈"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.requisitos}>
        <Text style={styles.requisitoTexto}>{tamanho ? "✅" : "❌"} Conter pelo menos 8 caracteres</Text>
        <Text style={styles.requisitoTexto}>{senhasIguais ? "✅" : "❌"} As senhas são iguais</Text>
        <Text style={styles.requisitoTexto}>{requisitos.maiuscula ? "✅" : "❌"} Pelo menos uma letra maiúscula</Text>
        <Text style={styles.requisitoTexto}>{requisitos.minuscula ? "✅" : "❌"} Pelo menos uma letra minúscula</Text>
        <Text style={styles.requisitoTexto}>{requisitos.numero ? "✅" : "❌"} Pelo menos um número</Text>
        <Text style={styles.requisitoTexto}>{requisitos.caractereEspecial ? "✅" : "❌"} Pelo menos um caractere especial</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "#fff",
    textAlign: 'center'
  },
  label: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C3E50',
    borderRadius: 25, 
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
  },
  emoji: {
    fontSize: 18,
    marginLeft: 8,
    color: "#fff",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
  },
  requisitos: {
    marginTop: 10,
  },
  requisitoTexto: {
    color: "#fff",
  },
});

export default PasswordDefinition;
