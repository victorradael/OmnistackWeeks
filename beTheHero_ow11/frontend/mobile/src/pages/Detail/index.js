import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';

import styles from './styles';



export default function Detail() {
    
    const route = useRoute();
    const incident = route.params.incident;
    
    const navigation = useNavigation();
    const message = `Hello,${incident.name}, I am in touch because I would like to help in the case of ${incident.title} with the value of R$${incident.value},00`;


    function navigateToIncidents() {
        navigation.navigate('Incidents');
    }

    function sendEmail(){
        MailComposer.composeAsync({
            subject: `Hero of incident: ${incident.title}`,
            recipients: [incident.email],
            body: message,
        });
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}=${message}`);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={navigateToIncidents} >
                    <Feather name='arrow-left'size={28} color='#e02041' />
                </TouchableOpacity>
                <Image source={logoImg}/>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, { marginTop: 0}]}>NGO:</Text>
                <Text style={styles.incidentValue}>{incident.name} from {incident.city} /{incident.uf}</Text>

                <Text style={styles.incidentProperty}>INCIDENT:</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>

                <Text style={styles.incidentProperty}>VALUE:</Text>
                <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', 
                        { style: 'currency', 
                        currency: 'BRL' })
                        .format(incident.value)}</Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Save the day!</Text>
                <Text style={styles.heroTitle}>Be the hero of this incident.</Text>

                <Text style={styles.heroDescription}>Contact us:</Text>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp} >
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendEmail} >
                        <Text style={styles.actionText}>Email</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}