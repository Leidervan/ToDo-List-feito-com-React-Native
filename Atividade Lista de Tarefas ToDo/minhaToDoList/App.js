import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';

export default function App() {
  const [tarefa, setTarefa] = useState('');
  const [listaTarefas, setListaTarefas] = useState([]);
  const [erro, setErro] = useState('');

  const adicionarTarefa = () => {
    if (tarefa.trim() === '') {
      setErro('Por favor, insira uma tarefa válida');
      return;
    }
    
    const novaTarefa = {
      id: Date.now().toString(),
      texto: tarefa,
    };
    
    setListaTarefas([...listaTarefas, novaTarefa]);
    setTarefa('');
    setErro('');
  };

  const removerTarefa = (id) => {
    setListaTarefas(listaTarefas.filter(item => item.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemTarefa}>
      <Text style={styles.textoTarefa}>{item.texto}</Text>
      <TouchableOpacity 
        style={styles.botaoRemover} 
        onPress={() => removerTarefa(item.id)}
      >
        <Text style={styles.textoBotaoRemover}>Remover</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Tarefas</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma nova tarefa"
          value={tarefa}
          onChangeText={setTarefa}
          placeholderTextColor="#a0a0a0"
        />
        <TouchableOpacity style={styles.botaoAdicionar} onPress={adicionarTarefa}>
          <Text style={styles.textoBotaoAdicionar}>Adicionar</Text>
        </TouchableOpacity>
      </View>
      
      {erro ? <Text style={styles.erro}>{erro}</Text> : null}
      
      <FlatList
        data={listaTarefas}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.lista}
        ListEmptyComponent={
          <Text style={styles.listaVazia}>Não há tarefas ainda. Adicione uma!</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1a2d5f', // Azul escuro para o fundo
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    marginTop: 50,
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    flex: 1,
    borderWidth: 0,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 0,
    backgroundColor: '#ffffff',
    fontSize: 16,
  },
  botaoAdicionar: {
    backgroundColor: '#4a80f5',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoBotaoAdicionar: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  erro: {
    color: '#ff6b6b',
    marginBottom: 15,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    overflow: 'hidden',
  },
  lista: {
    flex: 1,
    marginTop: 10,
  },
  itemTarefa: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 18,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  textoTarefa: {
    flex: 1,
    fontSize: 16,
    color: '#2c3e50',
  },
  botaoRemover: {
    backgroundColor: '#ff6b6b',
    padding: 10,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  textoBotaoRemover: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listaVazia: {
    textAlign: 'center',
    marginTop: 30,
    color: '#e0e0e0',
    fontSize: 16,
    fontStyle: 'italic',
  }
});