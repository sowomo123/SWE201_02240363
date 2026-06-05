# OrderTrack

A React Native Expo app for tracking food delivery orders with real-time status updates and push notifications.

## Features

- **Order Tracking**: View all your orders with real-time status updates
- **Status Timeline**: Visual timeline showing order progress from placement to delivery
- **Push Notifications**: Receive alerts for order status changes
- **Notification Management**: Toggle notifications per order
- **Order Creation**: Create new orders with restaurant and item details
- **Settings**: Manage notification permissions and view push tokens
- **Dark Theme**: Beautiful dark UI optimized for low-light environments

## Tech Stack

- **React Native** with Expo SDK 54
- **React Navigation** (Bottom Tabs + Native Stack)
- **expo-notifications** for push notifications
- **expo-device** for device detection
- **React Native Safe Area Context** for proper layout handling

## Project Structure

```
ordertrack/
├── app/
│   ├── api/
│   │   └── apiService.js          # API service for backend communication
│   ├── components/
│   │   ├── OrderCard.js           # Reusable order card component
│   │   └── StatusTimeline.js      # Visual status timeline component
│   ├── constants/
│   │   └── orderStatuses.js       # Order status constants and messages
│   ├── navigation/
│   │   └── AppNavigator.js        # Navigation configuration
│   ├── notifications/
│   │   └── notificationService.js # Notification management service
│   └── screens/
│       ├── HomeScreen.js          # Main orders list screen
│       ├── OrderDetailScreen.js   # Individual order details
│       ├── CreateOrderScreen.js   # Create new order form
│       └── SettingsScreen.js      # App settings and permissions
├── App.js                         # Main app component with notification setup
└── app.json                       # Expo configuration
```

## Setup Instructions

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Install React Navigation dependencies** (if not already installed):
   ```bash
   npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs --legacy-peer-deps
   ```

3. **Install additional dependencies**:
   ```bash
   npx expo install expo-notifications expo-device react-native-safe-area-context react-native-screens
   ```

4. **Start the development server**:
   ```bash
   npx expo start
   ```

5. **Run on device**:
   - Scan the QR code with Expo Go (Android) or Camera app (iOS)
   - Press `a` for Android emulator
   - Press `i` for iOS simulator
   - Press `w` for web browser

## Challenges Faced and Solutions

### Challenge 1: React Navigation Dependency Conflicts

**Problem**: When installing React Navigation packages, npm encountered peer dependency conflicts with the Expo SDK 54 and React Native version.

**Error**:
```
npm error ERESOLVE unable to resolve dependency tree
npm error peer react-native-screens@">= 4.0.0" from @react-navigation/bottom-tabs@7.16.2
npm error Conflicting peer dependency: react-native@0.85.3
```

**Solution**: Used the `--legacy-peer-deps` flag to bypass strict peer dependency resolution:
```bash
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs --legacy-peer-deps
```

### Challenge 2: Missing react-native-safe-area-context

**Problem**: The app crashed with "Unable to resolve react-native-safe-area-context" error when trying to use React Navigation.

**Error**:
```
Unable to resolve "react-native-safe-area-context" from "@react-navigation/bottom-tabs"
```

**Solution**: Installed the missing package with legacy peer deps:
```bash
npx expo install react-native-safe-area-context react-native-screens --legacy-peer-deps
```

### Challenge 3: iOS Boolean/String Type Error

**Problem**: On iOS, the app crashed with "TypeError: expected dynamic type 'boolean', but had type 'string'" error. This occurred when using React Native components that expected boolean props but received strings or incompatible values.

**Error**:
```
Error: Exception in HostFunction: TypeError: expected dynamic type 'boolean', but had type 'string'
```

**Root Causes Identified**:
1. **Switch component props**: The `trackColor` and `thumbColor` props with object syntax `{ false: '#334155', true: '#6366f1' }` caused issues on iOS
2. **TouchableOpacity activeOpacity**: The `activeOpacity` prop caused type errors on iOS
3. **expo-notifications plugin config**: The plugin configuration in app.json referenced a missing icon file and had incompatible settings

**Solutions Applied**:
1. **Removed problematic Switch props**: Removed `trackColor`, `thumbColor`, and `ios_backgroundColor` from all Switch components to use default styling
2. **Removed activeOpacity**: Removed `activeOpacity` prop from all TouchableOpacity components
3. **Made disabled props explicit**: Changed all `disabled` props to explicitly return booleans using ternary operators:
   ```javascript
   // Before
   disabled={loading}
   
   // After
   disabled={loading ? true : false}
   ```
4. **Removed expo-notifications plugin config**: Removed the plugin configuration from app.json that was causing the error:
   ```json
   "plugins": []  // Removed expo-notifications config
   ```
5. **Fixed navigation header conflicts**: Removed conflicting `headerShown` and header style props from Tab.Screen that were meant for Stack Navigator

### Challenge 4: CSS Gap Property Not Supported

**Problem**: Used the `gap` property in StyleSheet which is not supported in older React Native versions, causing layout issues.

**Solution**: Replaced `gap` with traditional margin/padding:
```javascript
// Before
details: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 }

// After
details: { flexDirection: 'row', flexWrap: 'wrap' }
// Added marginRight to individual items
```

### Challenge 5: Expo Go Notification Limitations

**Problem**: expo-notifications functionality is limited in Expo Go (SDK 53+), with Android push notifications removed from Expo Go.

**Warning**:
```
WARN expo-notifications: Android Push notifications functionality provided by expo-notifications was removed from Expo Go with the release of SDK 53.
```

**Solution**: For full notification functionality, a development build is required. The app currently works with local notifications in Expo Go, but for production push notifications, you would need to:
1. Create a development build using EAS Build
2. Configure proper notification channels
3. Set up a backend server for push notifications

## Current Limitations

- **Push Notifications**: Limited in Expo Go - requires development build for full functionality
- **Backend**: Mock data is used - no actual backend server connected
- **Notification Icon**: Missing notification-icon.png file (plugin config removed to prevent errors)

## Future Improvements

- [ ] Add actual backend integration
- [ ] Create development build for full notification support
- [ ] Add notification icon assets
- [ ] Implement order cancellation
- [ ] Add order rating/review feature
- [ ] Add order history filtering
- [ ] Implement user authentication
- [ ] Add restaurant search/browse feature

## License

This project was created for educational purposes.
