import * as React from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions, Image } from "react-native";
import { LaunuchInfo } from "../../model/launchInfo";
import CardView from 'react-native-rn-cardview';
interface Props {
    launchInfo: LaunuchInfo
}
interface State {

}

export class LaunchInfoCard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        const {name, flight_number, details, date} = this.props.launchInfo;
        return (
            <CardView cardElevation={4}
                maxCardElevation={4}
                radius={10}
                backgroundColor={'#ffffff'}>
                <TouchableOpacity style={styles.container}>
                    <Image source={{ uri: 'https://cnet1.cbsistatic.com/img/t4Tacz2ToDb_BqC6KSmK6gV6eGk=/980x0/2020/05/31/5112f3db-5af6-431c-bc0d-a8108ccad2ee/spacex-falcon-9-launch.jpg' }} style={{ width: Dimensions.get('window').width - 20, height: (Dimensions.get('window').width / 2) }} resizeMode={'cover'} />
                    <Text style={styles.styleName}>{name}</Text>
                    <Text style={styles.styleTextDate}>{`Launch Date: ${date}`}</Text>
                    <Text style={styles.styleTextFlight}>{`Flight No: ${flight_number}`}</Text>
                    <Text style={styles.styleTextDetails}>{details ? details : 'No Details Available'}</Text>
                </TouchableOpacity>
            </CardView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom : 10
    },
    styleName : {
        marginTop : 10,
        paddingHorizontal : 10,
        fontSize : 15,
        color : 'black'
    },
    styleTextDetails : {
        marginTop : 5,
        paddingHorizontal : 10,
        fontSize : 13
    },
    styleTextFlight : {
        marginTop : 5,
        paddingHorizontal : 10,
        fontSize : 12,
        color : 'blue'
    },
    styleTextDate : {
        marginTop : 5,
        paddingHorizontal : 10,
        fontSize : 12
    }
})