import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, View, Text, FlatList} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CheckBox from '@react-native-community/checkbox';
import {useRealm} from '../hooks/useRealm';
import {useNavigation, useRoute} from '@react-navigation/native';

const AddTag = () => {
  const realm = useRealm();
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState('');
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (realm) {
      const storedTags = realm.objects('Tags');
      const tagsArray = Array.from(storedTags);
      setTags(tagsArray);
    }
  }, [realm]);

  const handleAddTags = () => {
    if (realm && input.trim() !== '') {
      realm.write(() => {
        realm.create('Tags', {
          id: Math.random().toString(36).substring(7),
          tag: input,
          selected: false,
        });
      });

      const storedTags = realm.objects('Tags');
      const tagsArray = Array.from(storedTags);
      setTags(tagsArray);
      setInput('');
    }
  };

  const handleToggleSelected = id => {
    if (realm) {
      realm.write(() => {
        const tag = realm.objectForPrimaryKey('Tags', id);
        tag.selected = !tag.selected;
      });

      const storedTags = realm.objects('Tags');
      const tagsArray = Array.from(storedTags);
      setTags(tagsArray);
    }
  };

  const handleSaveTags = () => {
    if (route.params?.onTagsSelected) {
      const selectedTags = tags.filter(tag => tag.selected);
      route.params.onTagsSelected(selectedTags);
    }
    navigation.goBack();
  };

  const DisplayTags = ({item}) => {
    return (
      <View style={styles.tag}>
        <View style={styles.innerTag}>
          <Icon name="label" size={25} />
          <Text style={styles.tagText}>{item.tag}</Text>
        </View>
        <CheckBox
          value={item.selected}
          onValueChange={() => handleToggleSelected(item.id)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.inputContainer}>
          <Pressable style={styles.backBtn} onPress={handleSaveTags}>
            <Icon name="arrow-back" size={25} />
          </Pressable>
          <TextInput
            value={input}
            onChangeText={value => setInput(value)}
            placeholder="Enter tag name"
            placeholderTextColor={'white'}
            style={styles.inputBox}
          />
        </View>
        {input && (
          <View>
            <Pressable style={styles.inputContainer} onPress={handleAddTags}>
              <Icon name="add" size={25} />
              <Text style={styles.inputBox}>Create new tag "{input}"</Text>
            </Pressable>
          </View>
        )}
        {tags.length > 0 && !input && (
          <FlatList
            data={tags}
            keyExtractor={(_, index) => index.toString()}
            renderItem={DisplayTags}
            contentContainerStyle={styles.tags}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
  innerContainer: {
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 30,
    alignContent: 'center',
  },
  inputBox: {
    fontSize: 17,
    color: 'white',
  },
  backBtn: {
    paddingTop: 10,
  },
  tags: {
    marginTop: 20,
  },
  tag: {
    padding: 10,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  innerTag: {
    padding: 4,
    flexDirection: 'row',
    gap: 30,
    alignContent: 'center',
  },
  tagText: {
    fontSize: 17,
  },
});

export default AddTag;
