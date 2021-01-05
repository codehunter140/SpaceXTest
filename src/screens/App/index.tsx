import * as React from "react";
import { SafeAreaView, StyleSheet, Animated, View, Dimensions, Text, TouchableOpacity } from "react-native";
import APIHelper from '../../utils/APIHelper';
import Spinner from 'react-native-loading-spinner-overlay';
import { LaunuchInfo } from '../../model/launchInfo';
import { SearchBar } from "../../components/SearchBar";
import { SwipeListView } from 'react-native-swipe-list-view';
import { LaunchInfoCard } from "../../components/LaunchInfoCard";
import { DatePickerDialog } from 'react-native-datepicker-dialog';
import moment from 'moment';
export interface Props {

}

interface State {
  loading: boolean,
  arrLaunches: Array<LaunuchInfo>,
  originLanuches: Array<LaunuchInfo>,
  searchDate : any
}

export class App extends React.Component<Props, State>{

  rowTranslateAnimatedValues: any = {};
  animationIsRunning: boolean = false;

  constructor(props: Props) {
    super(props)

    this.state = {
      loading: false,
      arrLaunches: [],
      originLanuches: [],
      searchDate : null
    };

    this.onSwipeValueChange = this.onSwipeValueChange.bind(this);

  }

  componentDidMount() {
    this.fetchUpcomingSpaceXData()
  }

  fetchUpcomingSpaceXData() {
    this.setState({ loading: true });
    APIHelper.fetchUpcomingSpaceX()
      .then(res => res.data)
      .then(results => {
        let arrLaunches: Array<LaunuchInfo> = [];
        results.forEach(result => {
          const { name, details, flight_number, upcoming, id, date_local } = result;
          let lanuchInfo: LaunuchInfo = { name, details, flight_number, upcoming, id, date: date_local };
          arrLaunches.push(lanuchInfo);
        });

        this.setState({ arrLaunches, originLanuches: arrLaunches });
        this.setState({ loading: false });
      })
      .catch(err => {
        this.setState({ loading: false });
        alert('Something went wrong while loading the data.');
      })

  }
  onSubmitKeyword(keyword: string) {
    let filtered = this.state.originLanuches.filter(item => {
      return item.name && item.name.toLowerCase().search(keyword.toLowerCase()) !== -1
    });

    this.setState({ arrLaunches: filtered });
  }
  onChangeKeyword(keyword: string) {
    let filtered = this.state.originLanuches.filter(item => {
      return item.name && item.name.toLowerCase().search(keyword.toLowerCase()) !== -1
    });
    this.setState({ arrLaunches: filtered });
  }
  removeLaunchInfo(id: any) {
    let originLanuches = [...this.state.originLanuches];
    let filered = [...this.state.arrLaunches];

    let index = originLanuches.findIndex(item => item.id === id);
    if (index !== -1) {
      originLanuches.splice(index, 1);
      this.setState({ originLanuches });
    }
    index = filered.findIndex(item => item.id === id)
    if (index !== -1) {
      filered.splice(index, 1);
      this.setState({ arrLaunches: filered })
    }
  }
  onSwipeValueChange(swipeData: any) {
    const { key, value } = swipeData;
    if (
      value < -Dimensions.get('window').width &&
      !this.animationIsRunning
    ) {
      this.animationIsRunning = true;
      Animated.timing(this.rowTranslateAnimatedValues[key], {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        this.removeLaunchInfo(key)
        this.animationIsRunning = false;
      });
    }
  };
  normalizeArray(arrLaunches: Array<LaunuchInfo>) {
    let arrSwipeList: any = [];
    arrLaunches.forEach(launchInfo => {
      let swipeData: any = { key: launchInfo.id, value: launchInfo };
      this.rowTranslateAnimatedValues[`${launchInfo.id}`] = new Animated.Value(1);
      arrSwipeList.push(swipeData);
    })
    return arrSwipeList;
  }
  selectDate(){
    this.refs.dateDialog.open({
      date : new Date()
    });
  }
  onDatePicked(date : any){
    
    let dateString : string = moment(date).format('YYYY-MM-DD');
    let filtered = this.state.originLanuches.filter(item => {
      return item.date && item.date.search(dateString) !== -1
    });
    this.setState({ arrLaunches: filtered });
   

  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Spinner
          visible={this.state.loading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <SearchBar onSubmitKeyword={(text) => this.onSubmitKeyword(text)} onChangeKeyword={(text) => this.onChangeKeyword(text)} />
        <TouchableOpacity
          onPress={this.selectDate.bind(this)}
          style={{alignItems : 'center', justifyContent : 'center',width : '100%', marginVertical : 10}}
        >
          <Text>Select a Date</Text>
        </TouchableOpacity>
        <View style={{ flex: 1, marginTop: 5, alignItems: 'center', justifyContent: 'center' }}>
          {
            this.state.arrLaunches.length > 0 ? <SwipeListView
              disableRightSwipe
              data={this.normalizeArray(this.state.arrLaunches)}
              renderItem={(data, rowMap) => (
                <LaunchInfoCard launchInfo={data.item.value} />
              )}
              leftOpenValue={0}
              rightOpenValue={-Dimensions.get('window').width}
              onSwipeValueChange={this.onSwipeValueChange}
              renderHiddenItem={(data, rowMap) => (
                <View>
                </View>
              )}
              useNativeDriver={false}
              style={styles.listConatiner}
            />
              :
              <Text>No data to display</Text>
          }
        </View>
        <DatePickerDialog ref="dateDialog" onDatePicked={this.onDatePicked.bind(this)}></DatePickerDialog>
      </SafeAreaView>
    );
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  },
  listConatiner: {
    flex: 1,
    marginHorizontal: 10,

  }
})
