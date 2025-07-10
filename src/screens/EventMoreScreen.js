import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    TextInput,
    Alert
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { removeEvent } from '../redux/slices/eventSlice';
import { selectTheme } from '../redux/slices/themeSlice';

const EventMoreScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();
    const theme = useSelector(selectTheme);
    const isDarkMode = theme === 'dark';

    const { fullItem } = route.params;
    const {
        eventName,
        region,
        description,
        date,
        eventType,
        dynasty,
        participants,
        isImportant,
        image
    } = fullItem;

    const handleDelete = () => {
        Alert.alert('Delete Event', 'Are you sure you want to delete this event?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: () => {
                    dispatch(removeEvent(fullItem.id));
                    navigation.goBack();
                },
            },
        ]);
    };

    const styles = StyleSheet.create({
        container: {
            backgroundColor: isDarkMode ? '#000' : '#fff',
            flex: 1,
            padding: 20,
            paddingTop: 80,
        },
        headerIcons: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 12,
            marginBottom: 20,
        },
        icon: {
            width: 26,
            height: 26,
            tintColor: isDarkMode ? '#fff' : '#000',
        },
        image: {
            width: '100%',
            height: 300,
            borderRadius: 20,
            marginBottom: 20,
        },
        important: {
            borderColor: isDarkMode ? '#fff' : '#000',
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 10,
            paddingVertical: 4,
            color: isDarkMode ? '#fff' : '#000',
            alignSelf: 'flex-start',
            marginBottom: 12,
        },
        title: {
            color: isDarkMode ? '#fff' : '#000',
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 16,
            fontFamily: 'Aboreto',
        },
        label: {
            color: isDarkMode ? '#888' : '#555',
            fontSize: 14,
            marginBottom: 4,
        },
        text: {
            color: isDarkMode ? '#fff' : '#000',
            fontSize: 16,
            marginBottom: 16,
        },
        tag: {
            borderColor: isDarkMode ? '#fff' : '#000',
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 10,
            paddingVertical: 6,
            alignSelf: 'flex-start',
            marginBottom: 16,
        },
        tagText: {
            color: isDarkMode ? '#fff' : '#000',
        },
        participant: {
            backgroundColor: isDarkMode ? '#111' : '#f0f0f0',
            color: isDarkMode ? '#fff' : '#000',
            padding: 12,
            borderRadius: 10,
            marginBottom: 12,
        },
    });

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerIcons}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/img/Frame1462984530.png')} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDelete}>
                    <Image source={require('../assets/img/fluent_delete-32-filled.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>

            {image ? (
                <Image source={{ uri: image }} style={styles.image} />
            ) : (
                <View style={[styles.image, { backgroundColor: isDarkMode ? '#333' : '#ccc' }]} />
            )}

            {isImportant && <Text style={styles.important}>Important Event</Text>}

            <Text style={styles.title}>{eventName}</Text>

            <Text style={styles.label}>Country & region</Text>
            <Text style={styles.text}>{region}</Text>

            <Text style={styles.label}>Date</Text>
            <Text style={styles.text}>{new Date(date).toDateString()}</Text>

            <Text style={styles.label}>Description</Text>
            <Text style={styles.text}>{description}</Text>

            <Text style={styles.label}>Types of events</Text>
            <View style={styles.tag}>
                <Text style={styles.tagText}>{eventType}</Text>
            </View>

            <Text style={styles.label}>Dynasty</Text>
            <Text style={styles.text}>{dynasty}</Text>

            <Text style={styles.label}>Participants</Text>
            {participants.map((p, index) => (
                <TextInput
                    key={index}
                    style={styles.participant}
                    editable={false}
                    value={p}
                    placeholder={`Participant ${index + 1}`}
                    placeholderTextColor={isDarkMode ? '#777' : '#aaa'}
                />
            ))}

            <View style={{ height: 40 }} />
        </ScrollView>
    );
};

export default EventMoreScreen;
