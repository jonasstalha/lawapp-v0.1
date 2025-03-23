import { View, Button } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

const Logout = ({ navigation }) => {
  const handleLogout = async () => {
    await signOut(auth);
    navigation.replace("Login");
  };

  return (
    <View>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default Logout;
