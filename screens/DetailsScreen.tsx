import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { Book } from "../types";

export default function DetailsScreen({route}: any){
    const {book} : {book: Book} = route.params;

    return(
        <ScrollView>            
            {book.imageLinks?.thumbnail && (
                    <Image
                      source={{ uri: book.imageLinks.thumbnail }}
                     
                    style={style.image}/>
                  )}
                  <Text style={style.title}>{book.title}</Text>
                  <Text style={style.overview}>{book.subtitle}</Text>
        </ScrollView>
    );
}
const style = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        padding: 16,
        backgroundColor: '#fff',
    },
    image:{
        width: '100%',
        height: 400,
        borderRadius: 8,
        alignItems:'center'

    },
    title:{
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 12
    },
    overview: {
  fontSize: 16,
  marginTop: 4,
  lineHeight: 22,         
  color: '#333',         
      
}


});