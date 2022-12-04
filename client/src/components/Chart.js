import React, {useState, useEffect} from 'react';
import {Card, Typography} from '@material-ui/core';
import {Line, Bar, Doughnut} from 'react-chartjs-2';

//Line Chart
export function LineChart() {
    const [lineChartData, setLineChartData] = useState({})
    useEffect(() => {
        const chart = () => {
            setLineChartData({
                labels: [2014, 2015, 2016, 2017, 2018, 2019, 2020],
                datasets: [
                    {
                        label: "Appointments",
                        data: [400, 500, 650, 800, 700, 800, 900],
                        borderColor: "#E57498",
                        backgroundColor: "rgb(0, 0, 0, 0)",
                        hoverBackgroundColor: "#E986a5",
                        borderWidth: 2
                    }
                ],
            })
        }
        chart()
    },[])

    return (
            <Card>
                <Line height={350} data={lineChartData} options={
                    {
                        responsive: true,
                        maintainAspectRatio: false,
                        title:{
                            display: true,
                            text:'Appointments Year by Year',
                            fontSize:25,
                        
                            // position: 'left'
                            fontColor: '#E57498',
                            fontStyle: 400,
                            
                          },
                        legend:{
                            display: false,
                            // position: 'right',
                            // lebel: {
                            //     fontColor: "red"
                            // }
                        },
                        
                        scales: {
                            yAxes: [
                                {
                                    ticks: {
                                        autoSkip: true,
                                        maxTicksLimit: 8,
                                        beginAtZero: true,
                                        // fontColor: "black"
                                    },
                                    minor: {
                                        // fontColor: "black"
                        
                                    },
                                    gridLines: {
                                        display: true,
                                        lineWidth: .5
                                    },
                                    // stacked: true
                                } 
                            ],
                            xAxes: [
                                {
                                    gridLines: {
                                        display: false
                                    }
                                }
                            ]
                        },
                        layout: {
                            padding: {
                                top: 20,
                                left: 20,
                                right: 20,
                                bottom: 20
                            }
                        },
                        // tooltips: {
                        //     enabled: true
                        // }
                    }}/>
            </Card>
    )
}








//Bar Chart
export function BarChart() {
    const [barChartData, setBarChartData] = useState({})
    useEffect(() => {
        const chart = () => {
            setBarChartData({
                labels: [2014, 2015, 2016, 2017, 2018, 2019, 2020],
                datasets: [
                    {
                        label: "Appointments",
                        data: [400, 500, 650, 800, 700, 800, 900],
                        borderColor: "#f9813a",
                        backgroundColor: "#f9813a",
                        hoverBackgroundColor: "#E986a5",
                        borderWidth: 2
                    }
                ],
                
            })
        }
        chart()
    },[])

    return (
            <Card>
                <Bar height={350} data={barChartData} options={
                    {   
                        responsive: true,
                        maintainAspectRatio: false,
                        title:{
                            display: true,
                            text:'Patients Year by Year',
                            fontSize:25,
                            align: 'start',
                            // position: 'left',
                            fontColor: '#E57498',
                            fontStyle: 400,
                          },
                        scales: {
                            yAxes: [
                                {
                                    ticks: {
                                        autoSkip: true,
                                        maxTicksLimit: 8,
                                        beginAtZero: true,
                                        // fontColor: "black"
                                    },
                                    minor: {
                                        // fontColor: "black"
                        
                                    },
                                    gridLines: {
                                        display: true,
                                        lineWidth: .5
                                    },
                                    // stacked: true
                                } 
                            ],
                            xAxes: [
                                {
                                    gridLines: {
                                        display: false
                                    }
                                }
                            ]
                        },
                        layout: {
                            padding: {
                                top: 20,
                                left: 20,
                                right: 20,
                                bottom: 20
                            }
                        },
                        legend:{
                            display: false,
                            // position: 'right',
                            // lebel: {
                            //     fontColor: "red"
                            // }
                        }
                }}/>
            </Card>
    )
}




//Pie Chart
export function PieChart() {
    const [pieChartData, setPieChartData] = useState({})
    useEffect(() => {
        const chart = () => {
            setPieChartData({
                labels: ['Completed', 'Canceled', 'Pending'],
                datasets: [
                    {
                        label: "Patients Year by Year",
                        data: [400, 500, 650],
                        // borderColor: "#f9813a",
                        backgroundColor: ["#519872", "#f05454", "#f9813a"],
                        // hoverBackgroundColor: "#E986a5",
                    }
                ],
                
            })
        }
        chart()
    },[])

    return (
            <Card>
                <Doughnut height={300} data={pieChartData} options={
                    {   
                        responsive: true,
                        maintainAspectRatio: false,
                        title:{
                            display: true,
                            text:'Patients Year by Year',
                            fontSize:25,
                            // position: 'left'
                            fontColor: '#E57498',
                            fontStyle: 400,
                            

                        
                          },
                        layout: {
                            padding: {
                                top: 10,
                                left: 20,
                                right: 20,
                                bottom: 20
                            }
                        },
                        legend:{
                            display: false,
                            // position: 'right',
                            // lebel: {
                            //     fontColor: "red"
                            // }
                        }
                    }}/>
            </Card>
    )
}



