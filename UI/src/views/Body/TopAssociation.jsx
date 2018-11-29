import React, { Component } from "react";
import { Panel, PanelBody, PanelHeading } from "../../components/Elemental/Panel";
import array from 'lodash/array';
import _ from 'lodash';
import { Doughnut } from 'react-chartjs-2';
import randomColor from 'randomcolor';


class TopAssociation extends Component {
    state = {
        search: "",
        results: [],
        color: [],
    }
    componentWillMount() {
        this.setState(st => {
            st.results = this.getTopAssociation();
            st.color = st.results.map(result => randomColor({ luminosity: 'bright' }))
            return st;
        })
    }
    getTopAssociation = () => {
        let info = this.props.info;
        let arr0 = Object.keys(this.props.info);
        let arr = Object.values(this.props.info);
        let arr1 = array.flattenDeep(arr);
        let arr2 = array.uniq(arr1);

        var services = arr2;
        var result = _.map(services, function (service) {
            var length = _.reject(arr1, function (el) {
                return (el.indexOf(service) < 0);
            }).length;
            var association = arr0.map(el0 => {
                if (info[el0].includes(service)) return el0;
                else return null;
            })
            association = array.uniq(association)
            return { id: service, count: length, association: association };
        });
        result.sort(function (a, b) { return a.count - b.count }).reverse();
        return result;
    }

    getChart = () => {
        const data = {
            labels: this.state.results.map(result => result.id),
            datasets: [{
                data: this.state.results.map(result => result.count),
                backgroundColor: this.state.color
            }]
        };
        return data;
    }
    goToElement = (e) => {
        let index = e[0] ? e[0]["_index"] : null;
        if(index !== null){
            let elem = document.getElementById(`association-id-${index}`);
            elem.scrollIntoView({
                behavior: 'smooth',
                block: "start"
            });
        }
    }
    render() {
        return (
            <div className="top-association">
                <h1>Top Associations of All Time</h1>
                <Panel class="search-body">
                    <Doughnut data={this.getChart()} onElementsClick={(e) => this.goToElement(e)} />
                </Panel>
                <Panel class="search-body">
                    {(this.state.results).map((key, i) => (
                        <div key={key.id} id={`association-id-${i}`}>
                            <PanelHeading>
                                <h1 style={{color: this.state.color[i]}}>{key.id} (count: {key.count})</h1>
                            </PanelHeading>
                            <PanelBody>{key.association.map(el => {
                                return <div className={`top-association-tags`} key={el}>{el}</div>
                            })}</PanelBody>
                        </div>
                    ))}
                </Panel>
            </div>
        )
    }

}

export default TopAssociation;
