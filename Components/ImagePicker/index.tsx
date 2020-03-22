import * as React from "react";
import { Button, Image, View, Alert } from "react-native";
import * as ExpoImagePicker from "expo-image-picker";
import * as Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";
import propTypes from "prop-types";

export default class ImagePicker extends React.Component {
  state = {
    image: null
  };

  constructor(props: Props) {
    super(props);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleImageChange(uri: ImageInfo) {
    this.props.onChangeImage(uri);
  }

  render() {
    let { image } = this.state;

    return (
      <View
        style={{
          borderRadius: 5,
          margin: 20,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#e3e9d8"
        }}
      >
        <Button title="Take Picture" onPress={this._pickImage} />
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
    console.log("hi");
  }

  getPermissionAsync = async () => {
    if (Constants.default.platform?.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        Alert.alert(
          "Sorry, we need camera roll permissions to make this work!"
        );
      }
    }
  };

  _pickImage = async () => {
    let result = await ExpoImagePicker.launchCameraAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      this.handleImageChange(result);
    }
  };
}
