import React, {Fragment, useEffect, useState} from 'react'; 

import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
//import PDFdocument from './PDFdocument';
import ProductionListTable from './ProductionListTable';


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
  


export default function ProductionListPdf({selectedRows,location}) {

  //First Shift
//   const[newData,setNewdata]=useState([]);
//     const getDailyMachineoperatorData=()=>{
//       axios.post('http://172.16.20.61:5000/shiftEditor/getSingleDayDetailShiftInformation', 
//       {
//         ShiftDate:finalday,
//       }).then((response) => {
//           console.log(response.data);
//           setNewdata(response.data)
//       })
//     }
    
    const moment = require('moment');
    const today = moment();
    let Date=today.format("HH:MM DD-MMMM-YYYY");
     console.log(Date);

      return (
        // <div className="App">
        //   <PDFDownloadLink document={<PDFdocument />} fileName="somename.pdf">
        //   {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
        // </PDFDownloadLink>
        // </div>

        
    
        <Fragment>
            <PDFViewer width="1200" height="600" filename="somename.pdf">
              <ProductionListTable selectedRows={selectedRows}
              location={location}
              />
            </PDFViewer>
          </Fragment>
      ); 
}
