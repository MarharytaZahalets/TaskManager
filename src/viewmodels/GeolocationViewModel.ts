import { useCallback, useState } from 'react';
import { Alert, PermissionsAndroid, Platform } from 'react-native';

import Geolocation, { type GeolocationError } from '@react-native-community/geolocation';
import { useFocusEffect } from '@react-navigation/native';

import { openAppSettings } from 'core/utils/utils';

export interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
}

const useGeolocationViewModel = () => {
  const [position, setPosition] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
  });

  const requestLocationPermission = useCallback(async (): Promise<boolean> => {
    if (Platform.OS === 'ios') {
      return true;
    }

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }, []);

  const fetchCurrentLocation = useCallback(() => {
    Geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition({ latitude, longitude });
      },
      (err: GeolocationError) => {
        if (err.code === 1) {
          // Permission denied
          Alert.alert(
            'Location Permission Required',
            'Please enable location permissions in the settings to use this feature.',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Open Settings', onPress: openAppSettings },
            ],
          );
        } else {
          Alert.alert('Error', `Could not retrieve location: ${err.message}`);
        }
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  }, []);

  useFocusEffect(() => {
    requestLocationPermission().then((hasPermission) => {
      if (hasPermission) {
        fetchCurrentLocation();
      } else {
        Alert.alert(
          'Permission Denied',
          'Location permission is required to use this feature. Please enable it in settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: openAppSettings },
          ],
        );
      }
    });
  });

  return {
    position,
  };
};

export default useGeolocationViewModel;
