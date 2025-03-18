import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function F1() {
  const [experiences, setExperiences] = useState([{ id: Date.now(), company: '', role: '', year: '' }]);

  const addExperience = () => {
    setExperiences([...experiences, { id: Date.now(), company: '', role: '', year: '' }]);
  };

  const handleInputChange = (id, field, value) => {
    setExperiences(
      experiences.map((exp) => {
        if(exp.id == id){
            return{ ...exp, [field]: value }
        }
        else return exp
      })
    );
  };

  return (
    <View style={styles.container}>
      {experiences.map((experience) => (
        <View key={experience.id} style={styles.experienceContainer}>
          <TextInput
            style={styles.input}
            placeholder="Company / Organisation"
            value={experience.company}
            onChangeText={(text) => handleInputChange(experience.id, 'company', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Role"
            value={experience.role}
            onChangeText={(text) => handleInputChange(experience.id, 'role', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Year"
            value={experience.year}
            onChangeText={(text) => handleInputChange(experience.id, 'year', text)}
          />
        </View>
      ))}
      <Button title="+" onPress={addExperience} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  experienceContainer: {
    marginBottom: 20,
    backgroundColor: '#333', // Adjust color based on your theme
    padding: 10,
    borderRadius: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#888',
    color: 'white', // For dark background
    marginVertical: 5,
    padding: 5,
  },
});
