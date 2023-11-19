import React, {Component} from 'react';
import { Col, Row } from 'antd';
import SatSetting from "./SatSetting";
import SatelliteList from "./SatelliteList";
import { BASE_URL, SAT_API_KEY, NEARBY_SATELLITE, STARLINK_CATEGORY } from "../constants";
import axios from "axios";
import WorldMap from "./WorldMap";
class Main extends Component {
    state = {
        setting: {},
        satInfo: {},
        isLoadingList: false,
        satList: [],
    }

    showNearbySatellite = setting => {
        // cb fn => get settings from the SatSetting
        this.setState( {setting: setting});
        // fetch sat list from the server
        this.fetchSatellite(setting);
    }

    fetchSatellite = setting => {
        // 1. get sat info from the server
        //  - setting / reg info
        // 2. analyze the response
        //  - case1: success => pass results to SatList
        //  - case2: failure => inform the user
        const { latitude, longitude, elevation, altitude } = setting;
        const url =
            `${BASE_URL}/${NEARBY_SATELLITE}/${latitude}/${longitude}/
            ${elevation}/${altitude}/${STARLINK_CATEGORY}/&apiKey=${SAT_API_KEY}`;

        this.setState({isLoadingList: true})
        // no need to configure data info
        axios.get(url)
            .then( res => {
                console.log(res);
                if (res.status === 200) {
                    this.setState( {
                        satInfo: res.data,
                        isLoadingList: false
                    })
                }
            })
            .catch( err => {
                console.log(err.message);
                this.setState({isLoadingList: false})
            })
    }

    showMap = (selected) => {
        console.log(selected);
        this.setState( pre => {
            return {
                ...pre,
                satList: [...selected]
            }
        })
    }

    render() {
        const { isLoadingList, satInfo, satList, setting } = this.state;

        return (
           <Row>
               <Col span={8} className="left-side">
                   <SatSetting onShow={this.showNearbySatellite}/>
                   <SatelliteList satInfo={satInfo}
                                  isLoad={isLoadingList}
                                  onShowMap={this.showMap}
                   />
               </Col>
               <Col span={16} className="right-side">
                   <WorldMap satData={satList} observerData={setting}/>
               </Col>
           </Row>
        );
    }
}

export default Main;