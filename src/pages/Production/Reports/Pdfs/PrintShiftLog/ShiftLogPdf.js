import React, {Fragment, useEffect, useState} from 'react'; 
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import ShiftLogTable from './ShiftLogTable';


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
  


export default function ShiftLogPdf({sortedMachineLogs,dateSelect,location}) {

  let array=dateSelect.split('-')
  let Date=array[2]+"/"+array[1]+'/'+array[0];

      return (
        // <div className="App">
        //   <PDFDownloadLink document={<PDFdocument />} fileName="somename.pdf">
        //   {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
        // </PDFDownloadLink>
        // </div>

        
    
        <Fragment>
            <PDFViewer width="1200" height="600" filename="somename.pdf">
              <ShiftLogTable Date={Date}
              sortedMachineLogs={sortedMachineLogs}
              location={location}
              />
            </PDFViewer>
          </Fragment>
      ); 
}
