import React, {Fragment, useEffect, useState} from 'react'; 

import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
//import PDFdocument from './PDFdocument';
import ShowStatusTable from './ShowStatusTable';
import { useGlobalContext } from '../../../../../../../Context/Context';

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
  


export default function PrintShowStatus({showStatusData,location}) {
  const{schedulelistdata}=useGlobalContext();

// const[showstatusdata,setShowStatusdata]=useState([])
// useEffect(()=>{
//   const unique = [...new Set(schedulelistdata.map(item => item.Schedule_Status))];
//   console.log(unique)
// let customArray = []
// for(let i = 0 ; i < unique.length ; i ++) {
//   let customObject = {Schedule_Status : "",schedulelistdata : []}
//       console.log(unique[i])
//       customObject.Schedule_Status = unique[i]
//       customObject.schedulelistdata.push(schedulelistdata[i])
//       setShowStatusdata(customObject)
// }
// },[schedulelistdata])

// console.log(showstatusdata)

    const moment = require('moment');
    const today = moment();
    let Date=today.format("HH:mm DD-MMMM-YYYY");

      return (
        <Fragment>
            <PDFViewer width="1200" height="600" filename="somename.pdf">
              <ShowStatusTable Date={Date}
              showStatusData={showStatusData} location={location}
              />
            </PDFViewer>
          </Fragment>
      ); 
}
