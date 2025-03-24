export default {
  expo: {
    name: "your-app-name",
    // ... other existing expo configs ...
    extra: {
      openaiApiKey: process.env.OPENAI_API_KEY ?? "",
    },
  },
}; 