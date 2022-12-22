import React from "react";
import { Page, Image, Document, StyleSheet, Text } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    width: 400
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  
  section: {
    textAlign: 'center',
    marginTop: '10px'
  },
  titleCertificate:{
    marginBottom: '100px'
  },
  dateCertificate:{
    marginTop: '75px'
  },
  signCertificate:{
    marginTop: '50px'
  }
});

export function PDFFile(props:any) {
    function CurrentDate(){
        var date = new Date();
        var day = date.getDay();
        var month = date.getMonth();

        let realMonth ="";

        switch(month){
            case 1:
                realMonth = "Januari";
                break;
            case 2:
                realMonth = "Februari";
                break;
            case 3:
                realMonth = "Maret";
                break;
            case 4:
                realMonth = "April";
                break;
            case 5:
                realMonth = "Mei";
                break;
            case 6:
                realMonth = "Juni";
                break;
            case 7:
                realMonth = "Juli";
                break;
            case 8:
                realMonth = "Agustus";
                break;
            case 9:
                realMonth = "September";
                break;
            case 10:
                realMonth = "Oktober";
                break;
            case 11:
                realMonth = "November";
                break;
            case 12:
                realMonth = "Desember";
                break;
        }

        var year = date.getFullYear();

        var formattedTime = day + ' ' + realMonth + ' ' + year;

        return formattedTime;
    }

  return (
    <Document>
      <Page style={styles.body} orientation="landscape">
        {/* <Text style={styles.header} fixed></Text> */}
        {/* <Image style={styles.image} src={LebronStretch} /> */}
        <div style={styles.titleCertificate}>
            <Text>
                Game Matematika
            </Text>
        </div>
        <div style={styles.section}>
            <Text>
                SERTIFIKAT KELULUSAN
            </Text>
        </div>
        <div style={styles.section}>
            <Text>
                diberikan kepada:
            </Text>
        </div>
        <div style={styles.section}>
            <Text>
                {props.name}
            </Text>
        </div>
        <div style={styles.section}>
            <Text>
                atas kelulusannya pada kelas belajar {props.game} pada Level {props.level} dengan jumlah pemain {props.jumlah} 
            </Text>
        </div>
        <div style={styles.dateCertificate}>
            <Text>
                Denpasar, {CurrentDate()}
            </Text>
            <Text style={styles.signCertificate}>
                Admin
            </Text>
        </div>
      </Page>
    </Document>
  );
}