import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TrackingDetails = ({ trackingData, trackingNumber }) => {
  // Extracting necessary information from trackingData
  const {
    // trackingNumber,
    shipperInformation,
    recipientInformation,
    latestStatusDetail,
    dateAndTimes,
    packageDetails,
    shipmentDetails,
    originLocation,
    destinationLocation,
    serviceDetail,
    standardTransitTimeWindow,
  } = trackingData.completeTrackResults[0].trackResults[0];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Tracking Details</Text>
      <Text>Tracking Number: {trackingNumber}</Text>
      <Text>Shipper: {shipperInformation.address.city}, {shipperInformation.address.countryName}</Text>
      <Text>Recipient: {recipientInformation.address.city}, {recipientInformation.address.countryName}</Text>
      <Text>Latest Status: {latestStatusDetail.description}</Text>
      <Text>Origin: {originLocation.locationContactAndAddress.address.city}, {originLocation.locationContactAndAddress.address.countryName}</Text>
      <Text>Destination: {destinationLocation.locationContactAndAddress.address.city}, {destinationLocation.locationContactAndAddress.address.countryName}</Text>
      <Text>Service: {serviceDetail.description}</Text>
      <Text>Standard Transit Time Window: {standardTransitTimeWindow.window.ends}</Text>
      <Text>Package Details:</Text>
      <Text>- Weight: {packageDetails.weightAndDimensions.weight[0].value} {packageDetails.weightAndDimensions.weight[0].unit}</Text>
      <Text>- Dimensions: {packageDetails.weightAndDimensions.dimensions[0].length}x{packageDetails.weightAndDimensions.dimensions[0].width}x{packageDetails.weightAndDimensions.dimensions[0].height} {packageDetails.weightAndDimensions.dimensions[0].units}</Text>
      {/* Add more package details as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default TrackingDetails;
