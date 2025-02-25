// Explore screen with collapsible sections

import { Text, View, Button, StyleSheet, Image } from "react-native";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput } from "react-native-paper";
import { Link } from "expo-router";

type Props = {
  screen: "Login" | "Signup";
};

export default function LoginScreen({ screen }: Props) {
  const userSchema = z.object({
    username: z
      .string()
      .min(5, { message: "Username must be at least 5 characters." })
      .max(30, { message: "Username must be at most 30 characters." })
      .optional(),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(4, { message: "Password must be at least 4 characters." }),
  });

  type UserFormType = z.infer<typeof userSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormType>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit: SubmitHandler<UserFormType> = (data: UserFormType) => {
    console.log(data);
  };

  return (
    <View className="bg-[#090c54] px-5 h-screen" style={styles.container}>
      <View className="w-full h-2/3 flex flex-col justify-around px-5 rounded-2xl border border-yellow-400 shadow-2xl bg-slate-950">
        <View className="w-full flex max-h-[30%] items-center mb-5">
          <Image
            source={require("@/assets/images/brand.png")}
            className="scale-[0.6]"
          />
          <Text className="text-white text-4xl font-bold mb-2">
            {screen === "Login" ? "Login" : "Sign Up"}
          </Text>
          <Text className="text-gray-200">
            Head Start and Create Your Account with us. 🚀
          </Text>
        </View>
        <View className="flex flex-col justify-around items-center bg-white/10 py-5 rounded-2xl ">
          {screen === "Signup" ? (
            <Controller
              control={control}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <View className="w-2/3">
                  <TextInput
                    mode="outlined"
                    label="Username"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    activeOutlineColor={error ? "red" : "black"}
                    className=""
                  />
                </View>
              )}
              name="username"
            />
          ) : null}
          <Controller
            control={control}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <TextInput
                mode="outlined"
                label="E-mail"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                activeOutlineColor={error ? "red" : "black"}
                className="w-2/3"
              />
            )}
            name="email"
          />
          {screen === "Signup" && errors.email && (
            <Text style={{ color: "#ff8566" }}>{errors.email.message}</Text>
          )}

          <Controller
            control={control}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <TextInput
                mode="outlined"
                label="Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={
                  value === null || value === undefined ? "" : value.toString()
                }
                placeholder=""
                keyboardType="numeric"
                activeOutlineColor={error ? "red" : "black"}
                className="w-2/3"
              />
            )}
            name="password"
          />
          {errors.password && (
            <Text style={{ color: "#ff8566" }}>{errors.password.message}</Text>
          )}
        </View>
        <View
          className="w-full justify-center bg-blue-500 rounded-lg h-12 mt-5 mb-5"
          onTouchEndCapture={handleSubmit(onSubmit)}
        >
          <Text className="text-white text-center text-2xl font-bold">
            Sign Up
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
