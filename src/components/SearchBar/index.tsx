import * as React from "react";
import { TextInput, StyleSheet } from "react-native";
interface Props {
    onChangeKeyword : (keyword : string) => void,
    onSubmitKeyword : (keyword : string) => void
}
interface State {
    keyword: string
}

export class SearchBar extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            keyword: ''
        };
    }

    onChangeKeyword (keyword : string){
        this.setState({keyword : keyword});
        this.props.onChangeKeyword(this.state.keyword);

    }
    onSubmitKeyword() {
        this.props.onSubmitKeyword(this.state.keyword);
    }
    render() {
        return (
            <TextInput 
              style={styles.inputContainerStyle}
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={text => {
                this.onChangeKeyword(text);
              }}
              placeholder={'Search..'}
              placeholderTextColor={'#9a9a9a'}
              underlineColorAndroid={'transparent'}
              value={this.state.keyword}
              onSubmitEditing={ _=> {
                  this.onSubmitKeyword();
              }}
            >
            </TextInput>
        )
    }
}

const styles = StyleSheet.create({
    inputContainerStyle: {
        fontSize: 16,
        fontWeight: '400',
        height: 45,
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        color: 'black',
        borderRadius: 6,
        alignSelf: 'stretch',
        marginHorizontal: 10,
        borderColor: '#666666',
        borderWidth: 1
    }
})