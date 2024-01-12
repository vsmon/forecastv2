import React from 'react';
import {View, Text} from 'react-native';

interface msg {
  //sender_name: string;
  event: string;
  start: number;
  end: number;
  description: string;
  tags: string[];
}

interface messages {
  messages: msg[];
}

export default function Messages({messages}: messages) {
  return (
    <View>
      <Text style={{color: 'white'}}>Messages {messages[0].event}</Text>
    </View>
  );
}
