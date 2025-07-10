import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    Switch,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { addEvent } from '../redux/slices/eventSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme } from '../redux/slices/themeSlice';

const CreateEventsScreen = ({ navigation }) => {
    const [eventName, setEventName] = useState('');
    const [region, setRegion] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [eventType, setEventType] = useState('All');
    const [dynasty, setDynasty] = useState('');
    const [participants, setParticipants] = useState(['']);
    const [isImportant, setIsImportant] = useState(false);
    const [image, setImage] = useState(null);
    const dispatch = useDispatch();

    const theme = useSelector(selectTheme);
    const isDarkMode = theme === 'dark';

    const backgroundColor = isDarkMode ? '#000' : '#fff';
    const textColor = isDarkMode ? '#fff' : '#000';
    const inputBackground = isDarkMode ? '#111' : '#f0f0f0';
    const placeholderColor = isDarkMode ? '#999' : '#666';

    const addParticipant = () => {
        setParticipants([...participants, '']);
    };

    const updateParticipant = (index, value) => {
        const updated = [...participants];
        updated[index] = value;
        setParticipants(updated);
    };

    const handleImagePick = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                const uri = response.assets[0].uri;
                setImage(uri);
            }
        });
    };

    const handleDone = () => {
        const newEvent = {
            eventName,
            region,
            description,
            date: date.toISOString(),
            eventType,
            dynasty,
            participants: participants.filter(p => p.trim() !== ''),
            isImportant,
            image,
        };

        dispatch(addEvent(newEvent));
        navigation.goBack();
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/img/Frame1462984530.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDone}>
                    <Text style={[styles.done, { color: textColor }]}>DONE</Text>
                </TouchableOpacity>
            </View>

            <Text style={[styles.title, { color: textColor }]}>ADD EVENT</Text>

            <TouchableOpacity style={styles.imagePicker} onPress={handleImagePick}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.image} />
                ) : (
                    <Image source={require('../assets/img/material-symbols-light_add-photo-alternate-outline.png')} />
                )}
            </TouchableOpacity>

            <TextInput
                placeholder="Name of the event"
                placeholderTextColor={placeholderColor}
                value={eventName}
                onChangeText={setEventName}
                style={[styles.input, { backgroundColor: inputBackground, color: textColor }]}
            />

            <TextInput
                placeholder="Country & region"
                placeholderTextColor={placeholderColor}
                value={region}
                onChangeText={setRegion}
                style={[styles.input, { backgroundColor: inputBackground, color: textColor }]}
            />

            <TextInput
                placeholder="Description"
                placeholderTextColor={placeholderColor}
                value={description}
                onChangeText={setDescription}
                multiline
                style={[styles.input, { height: 100, backgroundColor: inputBackground, color: textColor }]}
            />

            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <Text style={[styles.dateText, { color: textColor }]}>Date: {date.toDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="spinner"
                    onChange={(event, selectedDate) => {
                        setShowDatePicker(false);
                        if (selectedDate) setDate(selectedDate);
                    }}
                />
            )}

            <View style={[styles.pickerContainer, { backgroundColor: inputBackground }]}>
                <Picker
                    selectedValue={eventType}
                    onValueChange={(itemValue) => setEventType(itemValue)}
                    dropdownIconColor={textColor}
                    style={[styles.picker, { color: textColor }]}
                >
                    <Picker.Item label="All" value="All" />
                    <Picker.Item label="War" value="War" />
                    <Picker.Item label="Coronation" value="Coronation" />
                    <Picker.Item label="Marriage" value="Marriage" />
                    <Picker.Item label="Death" value="Death" />
                </Picker>
            </View>

            <TextInput
                placeholder="Dynasty"
                placeholderTextColor={placeholderColor}
                value={dynasty}
                onChangeText={setDynasty}
                style={[styles.input, { backgroundColor: inputBackground, color: textColor }]}
            />

            {participants.map((participant, index) => (
                <TextInput
                    key={index}
                    placeholder={`Participant ${index + 1}`}
                    placeholderTextColor={placeholderColor}
                    value={participant}
                    onChangeText={(text) => updateParticipant(index, text)}
                    style={[styles.input, { backgroundColor: inputBackground, color: textColor }]}
                />
            ))}

            <TouchableOpacity onPress={addParticipant} style={styles.addBtn}>
                <Text style={{ color: placeholderColor }}>+ Add Participant</Text>
            </TouchableOpacity>

            <View style={styles.checkboxContainer}>
                <Switch
                    value={isImportant}
                    onValueChange={setIsImportant}
                    thumbColor={isImportant ? '#fff' : '#666'}
                    trackColor={{ false: '#999', true: '#444' }}
                />
                <Text style={[styles.checkboxLabel, { color: textColor }]}>Important Event</Text>
            </View>

            <View style={{ height: 50 }} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 80,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    done: {
        fontSize: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    imagePicker: {
        height: 160,
        width: '100%',
        backgroundColor: '#222',
        borderRadius: 12,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 160,
        width: '100%',
        borderRadius: 12,
        resizeMode: 'cover',
    },
    input: {
        borderRadius: 10,
        padding: 12,
        marginBottom: 16,
    },
    dateText: {
        marginBottom: 16,
    },
    pickerContainer: {
        borderRadius: 10,
        marginBottom: 16,
    },
    picker: {},
    addBtn: {
        marginTop: 10,
        marginBottom: 16,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkboxLabel: {
        marginLeft: 8,
    },
});

export default CreateEventsScreen;
