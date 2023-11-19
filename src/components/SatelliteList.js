import React, {Component} from 'react';
import {Button, Spin, Avatar, List, Checkbox} from "antd";
import satellite from "../assets/images/satellite.svg";
class SatelliteList extends Component {
    state = {
        selected: [],
        isLoad: false
    }

    onChange = e => {
        // 1. get active sat info (satellite) + get active status (check/uncheck)
        const { dataInfo, checked } = e.target;
        // 2. add to or remove from the current set array
        const { selected } = this.state;
        const list = this.addOrRemove(dataInfo, checked, selected);
        // 3. set the state of selected satellites
        this.setState( {selected: list})
    }

    addOrRemove = ( item, status, list ) => {
        // check the checkbox status and whether the item is in the list or not
        const found = list.some((entry) => entry.satid === item.satid);
        if (!found && status) {
            list = [...list, item];
        }
        if (found && !status) {
            list = list.filter( entry => entry.satid !== item.satid);
        }
        console.log("addOrRemove:", list);
        return list;
    }

    onShowSatMap = () => {
        this.props.onShowMap(this.state.selected)
    }

    render() {
        const { isLoad } = this.props;
        const satList = this.props.satInfo ? this.props.satInfo.above : [];

        return (
            <div className="sat-list-box">
                <div className="btn-container">
                    <Button className="sat-list-btn"
                            type="primary"
                            onClick={this.onShowSatMap}
                            disabled={this.state.selected.length === 0}
                    >
                        Track</Button>
                    <hr/>
                </div>

                {
                    isLoad
                        ?
                        <div className="spin-box">
                            <Spin tip="Loading" size="large"/>
                        </div>
                        :
                        <List itemLayout="horizontal"
                              className="sat-list"
                              dataSource={satList}
                              renderItem={(item) => (
                                  <List.Item
                                      actions={[<Checkbox dataInfo={item}
                                                          onChange={this.onChange}/>]}
                                      >
                                          <List.Item.Meta
                                              avatar={<Avatar size={50} src={satellite} />}
                                              title={<p>{item.satname}</p>}
                                              description={`Launch Date: ${item.launchDate}`}
                                          />
                                  </List.Item>
                              )}
                        />
                }
            </div>
        );
    }
}

export default SatelliteList;