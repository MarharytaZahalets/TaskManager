import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import MapView, { Marker } from 'react-native-maps';

import { AppSaveAreaView, BaseText, EmptyComponent } from 'components';
import { Colors } from 'core/theme/colors';
import { isAndroid } from 'core/utils/utils';
import styles from 'screens/GeolocationScreen/styles';
import useGeolocationViewModel from 'viewmodels/GeolocationViewModel';

import type { GeolocationScreenProps } from 'navigation/types';

const GeolocationScreen: React.FC<GeolocationScreenProps> = () => {
  const { position } = useGeolocationViewModel();
  const { latitude, longitude } = position;

  return (
    <AppSaveAreaView style={styles.container}>
      {!latitude && !longitude && (
        <ActivityIndicator size='large' color={Colors.accent} />
      )}
      {latitude && latitude && (
        <View style={styles.coordinatesContainer}>
          <BaseText style={styles.text}>Latitude: {latitude}</BaseText>
          <BaseText style={styles.text}>Longitude: {longitude}</BaseText>
        </View>
      )}
      {latitude && longitude && !isAndroid() && (
        <>
          <View style={styles.coordinatesContainer}>
            <BaseText style={styles.text}>Latitude: {latitude}</BaseText>
            <BaseText style={styles.text}>Longitude: {longitude}</BaseText>
          </View>
          <MapView
            style={styles.mapView}
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker coordinate={{ latitude, longitude }} />
          </MapView>
        </>
      )}
      {isAndroid() && (
        <EmptyComponent
          title={
            'Unfortunately, the map is not available on Android without ' +
            'a Google API key, which comes with the paid subscription'
          }
        />
      )}
    </AppSaveAreaView>
  );
};

export default GeolocationScreen;
