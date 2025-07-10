import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    FlatList,
} from 'react-native';

const questions = [
    {
        id: '1',
        question: 'How do you make important decisions?',
        answers: [
            'Analyze facts and consult experts',
            'Trust my intuition and personal experience',
            'Follow ancestral traditions',
            'Take risks to achieve a goal',
        ],
        correct: 0,
    },
    {
        id: '2',
        question: 'What is more important to you in communication?',
        answers: [
            'Clarity and logic',
            'Inspiration',
            'Respect for etiquette',
            'Take risks to achieve a goal',
        ],
        correct: 0,
    },
    {
        id: '3',
        question: 'Your reaction to a conflict at court?',
        answers: [
            'Seek compromise',
            'Use it to strengthen my position',
            'Defend family honor',
            'See a chance to prove myself',
        ],
        correct: 0,
    },
    {
        id: '4',
        question: 'How do you feel about tradition?',
        answers: [
            'I respect them, but I am ready to change them',
            'I use them if it is profitable',
            'I strictly observe them',
            'I prefer innovations',
        ],
        correct: 0,
    },
    {
        id: '5',
        question: 'What is your role at a court event?',
        answers: [
            'Organizer and strategist',
            'Center of attention',
            'Family official',
            'Innovator with ideas',
        ],
        correct: 0,
    },
    {
        id: '6',
        question: 'What is more important in a ruler?',
        answers: [
            'Wisdom and justice',
            'Charisma and influence',
            'Heredity',
            'Decisiveness',
        ],
        correct: 0,
    },
    {
        id: '7',
        question: 'How do you handle criticism?',
        answers: [
            'I weigh it rationally',
            'I use it for image',
            'I take it as an insult',
            'I see it as an incentive to grow',
        ],
        correct: 0,
    },
];

const QuizScreen = ({ navigation }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);

    const handleAnswer = () => {
        if (selectedAnswer === questions[currentQuestion].correct) {
            setScore(score + 1);
        }

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
        } else {
            navigation.navigate('WichCrownFitsScreen', { score });
        }
    };

    const q = questions[currentQuestion];

    return (
        <ImageBackground
            source={require('../assets/img/640fca76a9ebd712174fb67e77be7a7a.png')}
            style={styles.background}
        >
            <View style={styles.container}>
                <Text style={styles.counter}>{`${currentQuestion + 1}/7`}</Text>
                <Text style={styles.question}>{q.question}</Text>

                {q.answers.map((answer, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => setSelectedAnswer(index)}
                        style={[
                            styles.answer,
                            selectedAnswer === index && styles.selectedAnswer,
                        ]}
                    >
                        <Text style={styles.answerText}>
                            {String.fromCharCode(65 + index)}. {answer}
                        </Text>
                    </TouchableOpacity>
                ))}

                <TouchableOpacity
                    onPress={handleAnswer}
                    disabled={selectedAnswer === null}
                    style={[
                        styles.chooseButton,
                        selectedAnswer === null && styles.disabledButton,
                    ]}
                >
                    <Text style={styles.chooseText}>CHOOSE</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
    },
    counter: {
        color: 'white',
        fontSize: 16,
        marginBottom: 8,
    },
    question: {
        fontSize: 22,
        color: 'white',
        marginBottom: 24,
        fontWeight: '600',
        fontFamily: 'Aboreto',
    },
    answer: {
        backgroundColor: '#2E2E2E',
        borderRadius: 10,
        padding: 16,
        marginBottom: 12,
    },
    selectedAnswer: {
        borderColor: '#E2D3AA',
        borderWidth: 2,
    },
    answerText: {
        color: 'white',
        fontSize: 16,
    },
    chooseButton: {
        backgroundColor: '#E2D3AA',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 24,
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    chooseText: {
        fontWeight: 'bold',
        fontFamily: 'Aboreto',
    },
});

export default QuizScreen;
