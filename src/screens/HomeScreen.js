import { signOut } from 'firebase/auth';
import { Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import { auth } from '../services/firebase';

export default function HomeScreen() {
  return (
    <View>
      <Text>Home Screen</Text>
      <AppButton title="Logout" onPress={() => signOut(auth)} />
    </View>
  );
}