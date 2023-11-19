import React, {Component} from 'react';
import { Button, Form, InputNumber } from 'antd';
class SatSetting extends Component {
    showSatellite = (values) => {
        this.props.onShow(values);
    }
    render() {
        return (
            <Form
                className="sat-setting"
                name="wrap"
                labelCol={{
                    flex: '110px',
                }}
                labelAlign="left"
                labelWrap
                wrapperCol={{
                    flex: 1,
                }}
                colon={false}
                onFinish={this.showSatellite}
            >
                <Form.Item
                    label="Longitude(degrees)"
                    name="longitude"
                    rules={[
                        {
                            required: true,
                            message: "Please input your longitude",
                        },
                    ]}
                >
                    <InputNumber min={-180}
                                 max={180}
                                 style={{width: "100%"}}
                                 placeholder="Please input longitude"
                    />
                </Form.Item>

                <Form.Item
                    label="Latitude(degrees)"
                    name="latitude"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Latitude",
                        }
                    ]}
                >
                    <InputNumber min={-90} max={90}
                                 style={{width: "100%"}}
                                 placeholder="Please input Longitude"
                    />
                </Form.Item>

                <Form.Item
                    label="Elevation(meters)"
                    name="elevation"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Elevation",
                        }
                    ]}
                >
                    <InputNumber min={-413} max={8850}
                                 style={{width: "100%"}}
                                 placeholder="Please input Longitude"
                    />
                </Form.Item>

                <Form.Item
                    label="Altitude(degrees)"
                    name="altitude"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Altitude",
                        }
                    ]}
                >
                    <InputNumber min={0} max={90}
                                 style={{width: "100%"}}
                                 placeholder="Please input Longitude"
                    />
                </Form.Item>

                <Form.Item
                    label="Duration(secs)"
                    name="duration"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Duration",
                        }
                    ]}
                >
                    <InputNumber min={0} max={90}
                                 style={{width: "100%"}}
                                 placeholder="Please input Longitude"
                    />
                </Form.Item>

                <Form.Item className="show-nearby">
                    <Button type="primary" htmlType="submit" style={{textAlign: "center"}}>
                        Find Satellite
                    </Button>
                </Form.Item>

            </Form>
        );
    }
}

export default SatSetting;
