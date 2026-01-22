import React, { useState, useEffect }  from 'react';
import { ScrollView } from 'react-native';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {  useRoute, useNavigation} from '@react-navigation/native';
import StarRating from 'react-native-star-rating-widget';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const PrimaryColor = '#0A3B74';

const Ratings = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { doctorId } = route.params;
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchRatings = async () => {
        try {
        const q = query(
            collection(db, 'opiniones'),
            where('doctorId', '==', doctorId)
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map(doc => {
            const r = doc.data();
            return {
                id: doc.id,
                rating: r.rating,
                opinion: r.comentario,
                image: r.pacienteFoto,
                date: r.fecha?.toDate().toLocaleDateString('es-MX'),
            };
        });

        setRatings(data);
        } catch (error) {
        console.error('Error al cargar valoraciones:', error);
        } finally {
        setLoading(false);
        }
    };

    fetchRatings();
    }, []);

    const renderRating = (item) => (
        <View key={item.id} style={styles.ratingCard}>
            
            {/* avatar */}
            <Image source={{ uri: item.image }} style={styles.ratingImage} />
    
            {/* content */}
            <View style={styles.ratingContent}>
    
                <View style={styles.ratingHeader}>
                    <StarRating
                        rating={item.rating}
                        onChange={() => {}}
                        starSize={16}
                        enableSwiping={false}
                        starStyle={{ marginRight: 2 }}
                    />
        
                    {item.date && (
                        <Text style={styles.ratingDate}>{item.date}</Text>
                    )}
                </View>
        
                <Text style={styles.ratingText}>{item.opinion}</Text>
            </View>
        </View>
    );

    return(
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}
      style={{ backgroundColor: '#fff' }}>
            <View style={styles.container}>
                {/*header*/}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back-outline" size={24} color="black" />
                    </TouchableOpacity>
        
                    <Image 
                        source={require('../../assets/logoDocNow.png')} 
                        style={{ width: 30, height: 30 }}
                    />
        
                    <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
                        <Ionicons name="settings-outline" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.textDoctors}>Valoraciones</Text>

                {ratings.length === 0 ? (
                <Text style={{ textAlign: 'center', color: '#777', marginTop: 20 }}>
                    Este médico aún no tiene valoraciones
                </Text>
                ) : (
                    ratings.map(renderRating)
                )}

            </View>
        </ScrollView>

    );

};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    scroll: {
      flexGrow: 1,
      paddingBottom: 120,
      width: '100%',
    },
    header: {
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 50, 
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 20,
    },
    textDoctors: {
        fontSize: 22,
      fontWeight: 'bold',
      marginRight: 10,
      color: PrimaryColor,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
      alignContent: 'center',
      alignSelf: 'center',
    },
    ratingCard: {
        flexDirection: 'row',
        marginVertical: 12,
        width: '90%',
        alignSelf: 'center',  
    },
    ratingImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    ratingContent: {
        flex: 1,
    },
    ratingHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    starsRow: {
        flexDirection: 'row',
    },
    ratingDate: {
        fontSize: 12,
        color: '#777',
    },
    ratingText: {
        marginTop: 6,
        fontSize: 14,
        color: '#000',
    },
});

export default Ratings;