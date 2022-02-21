import React, {Component} from 'react';
import {Text, TextInput, View} from 'react-native';
import {infoStyle} from './info.styles';
import { MaterialIcons } from '@expo/vector-icons'; 

interface InfoBoxProps {
  placeholder: string;
}

export default class SearchBox extends Component<InfoBoxProps, {}> {
  constructor(props: InfoBoxProps) {
    super(props);
  }
  render() {
    return (
      <View style={infoStyle.wrap}>
        <TextInput
          style={{
            fontFamily: 'p-400',
            fontSize: 15,
            width: '90%',
            color: '#000',
          }}
          placeholderTextColor={'lightgrey'}
          placeholder={this.props.placeholder}
        />
        <View>
          <MaterialIcons name="search" size={25} color={'#000'} />
        </View>
      </View>
    );
  }
}
