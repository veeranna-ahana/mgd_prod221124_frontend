import React, {Fragment, useEffect, useState} from 'react'; 
import axios from "axios";
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import PrintPriorityTable from './PrintPriorityTable';

const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });

//   const MyDoc = () => (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <View style={styles.section}>
//           <Text>Section #1</Text>
//         </View>
//         <View style={styles.section}>
//           <Text>Section #2</Text>
//         </View>
//       </Page>
//     </Document>
//   );
  


export default function PrintPriority({priorityTable,location}) {
  // console.log(priorityTable)

  const [sortedPriorityTable , setSortedPriorityTable] = useState([])
  
  useEffect(() => {
    // console.log('Priority Table from print priority ' , priorityTable)
    const unique = [...new Set(priorityTable.map(item => item.Machine))];
    // console.log(unique)
    let customArray = []
    for(let i = 0 ; i < unique.length ; i ++) {
      let customObject = {Machine : "" , priorityList : [], load : 0, newLoad : ""}
      // console.log(unique[i])
      customObject.Machine = unique[i]
      let load = 0 
      for(let k =0 ; k<priorityTable.length ; k++) {
        if(priorityTable[k].Machine == unique[i]) {
          load = load + priorityTable[k].EstimatedTime
          customObject.load = load
          priorityTable[k].load = load
          customObject.priorityList.push(priorityTable[k])
        }

      }
      customArray.push(customObject)
    }
    
    //converting the load from minutes to hours:minutes
    for(let j = 0 ; j < customArray.length ; j++) {
       const hours = Math.floor(customArray[j].load / 60);
       const minutes = customArray[j].load % 60;
       let newminutes = "default"
       if(minutes <= 9) {
        newminutes = "0" + minutes
       } else {
        newminutes = minutes
       }
       customArray[j].newLoad = hours + ":" + newminutes
      // console.log(customArray[j].newLoad = hours + ":" + newminutes)
    }
    // console.log('Custom Array is ' , customArray)
    setSortedPriorityTable(customArray)
  }, [priorityTable])
    
      //API 
  // const[newData,setNewdata]=useState([]);
  //   const getWeeklyshiftPrint=()=>{
  //     axios.post('http://172.16.20.61:5000/shiftEditor/getFullWeekDetailPlan', 
  //     {
  //       ShiftDate:selectedWeek,
  //     }).then((response) => {
  //         console.log(response.data);
  //         setNewdata(response.data)
  //     })
  //   }
    

    // useEffect(() => {
    //   getWeeklyshiftPrint();
    // }, []);


      return (
        // <div className="App">
        //   <PDFDownloadLink document={<PDFdocument />} fileName="somename.pdf">
        //   {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
        // </PDFDownloadLink>
        // </div>
    
        <Fragment>
            <PDFViewer width="1200" height="600" filename="somename.pdf">
              <PrintPriorityTable sortedPriorityTable={sortedPriorityTable}
              location={location}
              />
            </PDFViewer>
          </Fragment>
      );
    
}
