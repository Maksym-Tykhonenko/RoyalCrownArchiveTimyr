import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions} from 'react-native';
import Share from 'react-native-share';

const data = [
    {
        img: require('../assets/sces2/9d7969d29691e4af067f7c88351458acf02d7c91.png'),
        name: 'Crown Counselor',
        character: 'Rational, insightful, strategic. You are able to see the whole picture, anticipate risks and find non-obvious solutions. Your strength lies in your ability to keep a cool head even in crises',
        speech: 'Concise, logical, with examples from history or science',
        example: '"Power is not a tyranny, but a tool. Use it as a healer uses a scalpel: precisely and without unnecessary movements"',
        historical: 'Cardinal Richelieu, architect of French statehood, master of political intrigue and reform'
    },
    {
        img: require('../assets/sces2/53f4f868005c3f1656430e24bb195adb6a01c379.png'),
        name: 'Queen without \n' +
            'a throne',
        character: 'Charismatic, ambitious, manipulator. You master the art of influence, able to turn the weaknesses of others into their advantages. Your throne is not gold, but the minds and hearts of others.',
        speech: 'Emotional, metaphorical, with a touch of mystery',
        example: '"A throne is only a decoration. The true crown is fear and admiration in the eyes of those who think they rule you"',
        historical: 'Catherine de Medici, the “black queen” of France, who held power through intrigue, marriage and court games'
    },
    {
        img: require('../assets/sces2/90c0aab03def98f539f000f2d66bdd9606fedfed.png'),
        name: 'Guardian of the dynasty',
        character: 'Conservative, loyal, unyielding. You are a pillar of tradition, a living link between the past and the future. For you the honor of the family and the observance of the foundations is more important than personal ambitions.',
        speech: 'Polite, respectful, with quotations from ancient texts',
        example: '"The roots of a tree are stronger than its branches. Break tradition and the throne will fall with it"',
        historical: 'Confucius is a philosopher whose ideas became the basis of China\'s dynastic ethics for millennia'
    },
    {
        img: require('../assets/sces2/e94a6c604bd60872b2380a20ca7406df4d484e6b.png'),
        name: 'Young Challenger',
        character: 'Adventurous, daring, innovative. You defy convention, believe in the power of change, and are willing to take risks for greatness. Your weakness is impatience, but it is also your strength.',
        speech: 'Energetic, direct, challenging and provocative',
        example: '"The throne is not inherited - it is conquered. And if you can\'t, you change the rules of the game"',
        historical: 'Peter the Great was a reformist tsar who turned Russia into an empire through radical transformations'
    },
]


const WichCrownFitsScreen = ({ navigation }) => {
    const [fullItem, setFullItem] = useState(null);
    const theme = useSelector(selectTheme);
    const isDarkMode = theme === 'dark';
    const localStyles = styles(isDarkMode);

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * data.length);
        setFullItem(data[randomIndex]);
    }, []);

    const handleShare = async () => {
        if (!fullItem) return;
        const shareOptions = {
            title: 'Share Dynasty',
            message: `👑 ${fullItem.name}\n\nType: ${fullItem.type}\nPeriod: ${fullItem.period}\nCountry: ${fullItem.country}`,
        };

        try {
            await Share.open(shareOptions);
        } catch (error) {
            console.log('Share error:', error);
        }
    };

    if (!fullItem) {
        return (
            <View style={localStyles.container}>
                <Text style={{ color: isDarkMode ? '#fff' : '#000' }}>Loading...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={localStyles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={localStyles.backButton}>
                    <Image source={require('../assets/img/Frame1462984530.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleShare} style={localStyles.backButton}>
                    <Image source={require('../assets/img/majesticons_share.png')} />
                </TouchableOpacity>
            </View>

            <Image
                source={fullItem.img}
                style={localStyles.image}
            />

            <Text style={localStyles.title}>{fullItem.name}</Text>

            <View style={localStyles.infoBlock}>
                <Text style={localStyles.label}>Character</Text>
                <Text style={localStyles.text}>{fullItem.character}</Text>
            </View>

            <View style={localStyles.infoBlock}>
                <Text style={localStyles.label}>Speech</Text>
                <Text style={localStyles.text}>{fullItem.speech}</Text>
            </View>

            <View style={localStyles.infoBlock}>
                <Text style={localStyles.label}>Example</Text>
                <Text style={localStyles.text}>{fullItem.example}</Text>
            </View>

            <View style={localStyles.infoBlock}>
                <Text style={localStyles.label}>Historical</Text>
                <Text style={localStyles.text}>{fullItem.historical}</Text>
            </View>

            <View style={{ marginBottom: 50 }} />
        </ScrollView>
    );
};

const styles = (isDarkMode) => StyleSheet.create({
    container: {
        backgroundColor: isDarkMode ? '#000' : '#fff',
        flex: 1,
        padding: 20,
        paddingTop: 70,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 20,
        marginBottom: 20,
    },
    title: {
        fontSize: 26,
        color: isDarkMode ? '#fff' : '#000',
        fontWeight: '600',
        marginBottom: 20,
        letterSpacing: 1,
        fontFamily: 'Aboreto',
    },
    infoBlock: {
        marginBottom: 16,
    },
    label: {
        color: isDarkMode ? '#999' : '#666',
        fontSize: 13,
        marginBottom: 4,
    },
    text: {
        color: isDarkMode ? '#fff' : '#000',
        fontSize: 15,
        lineHeight: 20,
    },
    map: {
        width: '100%',
        height: 180,
        marginTop: 10,
        borderRadius: 12,
    },
});

export default WichCrownFitsScreen;
