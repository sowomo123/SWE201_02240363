# Practical 4: Push Notifications for Android & iOS

This is an Expo application that demonstrates comprehensive push notification implementation for both Android and iOS platforms.

## Aims

The primary aim of this practical is to develop a cross-platform mobile application that implements push notification functionality for both Android and iOS devices using the Expo framework. The project focuses on creating a user-friendly interface that demonstrates various notification types, permission management, and notification scheduling capabilities.

## Objectives

1. **Implement Cross-Platform Push Notifications**: Create a notification system that works seamlessly on both Android and iOS platforms using Expo's unified API.

2. **Develop Permission Management**: Implement a robust permission request system that handles user consent for notifications in a user-friendly manner.

3. **Support Multiple Notification Types**: Enable different notification delivery methods including immediate notifications, scheduled notifications, and repeating notifications.

4. **Create Notification Management Features**: Develop functionality to view, cancel individual, and cancel all scheduled notifications.

5. **Generate Push Tokens**: Implement push token generation for remote notification support and backend integration.

6. **Platform-Specific Configuration**: Configure Android notification channels and iOS-specific settings for optimal notification delivery.

7. **Build Interactive User Interface**: Create an intuitive demo interface that showcases all notification features with real-time status updates.

## Learning Outcomes

Upon completion of this practical, students will be able to:

- **Understand Expo Framework**: Gain practical experience with Expo SDK and its cross-platform development capabilities.

- **Implement Push Notifications**: Master the implementation of local and remote push notifications using expo-notifications library.

- **Handle Platform Differences**: Learn to manage platform-specific requirements for Android (notification channels) and iOS (permissions).

- **Create Custom Hooks**: Develop reusable React hooks for managing notification state and functionality.

- **Build Service Layer**: Implement a service-oriented architecture for business logic separation.

- **Manage App Permissions**: Understand and implement proper permission handling for mobile applications.

- **Schedule Notifications**: Learn to schedule and manage time-based notifications with different intervals.

- **Debug Mobile Applications**: Gain experience in troubleshooting cross-platform mobile development issues.

- **TypeScript Integration**: Apply TypeScript for type-safe React Native development.

- **User Interface Design**: Create responsive and user-friendly mobile interfaces.

## Problems Encountered

### 1. Expo SDK Version Compatibility
**Problem**: Initial project was created with Expo SDK 55, which was incompatible with the user's Expo Go app version, causing "project is incompatible with this version of expo" errors.

**Solution**: Downgraded the project to Expo SDK 50, which is more widely supported by older Expo Go versions. Updated all dependencies to match SDK 50 requirements.

### 2. Missing Dependencies
**Problem**: The project was missing required packages like `expo-image` and `expo-symbols`, causing module resolution errors during bundling.

**Solution**: Added the missing packages to package.json and reinstalled dependencies using `npm install --legacy-peer-deps` to handle peer dependency conflicts.

### 3. Web Rendering Errors
**Problem**: Static web rendering was failing with "Unable to resolve module stream" errors from react-dom, preventing the development server from starting properly.

**Solution**: Removed web support from the project by:
- Deleting web-specific configuration from app.json
- Removing web scripts from package.json
- Deleting web-specific component files (app-tabs.web.tsx, web-badge.tsx)
- Removing web dependencies (react-native-web, react-dom, expo-web-browser)

### 4. Platform-Specific Code Issues
**Problem**: The explore.tsx file contained Platform.OS checks and web-specific styling that were causing compatibility issues after removing web support.

**Solution**: Simplified the explore.tsx file by removing Platform.select statements and web-specific code, focusing on mobile-only functionality.

### 5. Dependency Conflicts
**Problem**: Multiple dependency conflicts arose during version downgrades, particularly with expo-router and related packages requiring specific version ranges.

**Solution**: Used `npm install --legacy-peer-deps` to bypass peer dependency checks and manually adjusted package versions to ensure compatibility.

### 6. Android SDK Not Installed
**Problem**: Attempting to run on Android emulator failed due to missing Android SDK and adb command not being recognized.

**Solution**: Acknowledged that Android Studio/Android SDK is not installed and provided alternative solution using Expo Go on physical Android device via QR code scanning.

## Solutions Implemented

### Technical Solutions

1. **Version Management**: Systematically downgraded from SDK 55 to SDK 50, ensuring all dependencies were compatible with the target version.

2. **Dependency Resolution**: Used legacy peer deps flag and manually curated package versions to resolve conflicts.

3. **Platform Simplification**: Removed web support entirely to focus on mobile platforms where push notifications are most relevant.

4. **Code Refactoring**: Simplified components to remove platform-specific code that was no longer needed.

5. **Service Architecture**: Implemented a clean separation of concerns with notificationService.ts handling business logic and usePushNotifications.ts managing React state.

### Development Workflow Solutions

1. **Clean Installation**: Implemented proper cleanup process (removing node_modules) before fresh installation to avoid cached conflicts.

2. **Cache Clearing**: Used `npx expo start -c` to clear Metro bundler cache when starting the development server.

3. **Incremental Testing**: Tested the application incrementally after each major change to identify issues early.

## Conclusion

This practical successfully demonstrates the implementation of cross-platform push notifications using Expo SDK 50. The project achieved its primary objectives by creating a functional notification system that works on both Android and iOS devices with proper permission management, multiple notification types, and comprehensive notification management features.

The development process highlighted several important lessons:

1. **Version Compatibility**: The importance of matching Expo SDK versions with the target Expo Go app version cannot be overstated. Using widely-supported SDK versions (like SDK 50) ensures better compatibility across different user environments.

2. **Platform Focus**: For mobile-specific features like push notifications, removing web support can simplify development and eliminate unnecessary complexity.

3. **Dependency Management**: Careful dependency management is crucial in React Native/Expo projects, especially when dealing with multiple packages that have interdependent version requirements.

4. **Service-Oriented Design**: Separating business logic into service classes and using custom hooks for state management leads to cleaner, more maintainable code.

5. **User Experience**: Proper permission handling and clear user feedback are essential for notification features to work effectively.

The final application provides a comprehensive demonstration of push notification capabilities and serves as a solid foundation for more advanced notification features such as rich notifications, notification categories, and backend integration for remote push notifications.

## Technology Stack

- **Expo SDK 54** - Cross-platform development framework
- **expo-notifications** - Push notification library
- **React Native** - Mobile framework
- **TypeScript** - Type-safe development
- **expo-router** - File-based routing

## Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npx expo start
```

3. Run on your preferred platform:
- Press `a` for Android
- Press `i` for iOS (requires macOS)

## Project Structure

```
Practical4/
├── src/
│   ├── app/
│   │   ├── index.tsx          # Main notification demo screen
│   │   ├── _layout.tsx        # App layout
│   │   └── explore.tsx        # Explore screen
│   ├── services/
│   │   └── notificationService.ts  # Core notification logic
│   ├── hooks/
│   │   └── usePushNotifications.ts  # Custom notification hook
│   ├── components/            # Reusable UI components
│   └── constants/             # App constants
├── assets/                    # Images and resources
├── app.json                   # Expo configuration
└── package.json              # Dependencies
```

## Key Components

### NotificationService (`src/services/notificationService.ts`)

Core service class that handles:
- Permission requests for notifications
- Push token generation
- Scheduling immediate, delayed, and repeating notifications
- Notification cancellation
- Platform-specific channel setup (Android)
- Notification listeners and response handlers

### usePushNotifications Hook (`src/hooks/usePushNotifications.ts`)

Custom React hook that provides:
- Permission status tracking
- Push token management
- Notification scheduling functions
- Scheduled notifications list
- Permission request handling

### Main Screen (`src/app/index.tsx`)

Interactive demo interface featuring:
- Permission status display with request button
- Push token display
- Notification creation form (title, body, delay)
- Multiple notification sending options
- Scheduled notifications list with cancel functionality
- Platform information display

## Usage

### Requesting Permissions

1. Open the app
2. Check the permission status badge
3. If not granted, tap "Request Permission"
4. Allow notifications when prompted by the system

### Sending Notifications

1. **Immediate Notification**: Tap "Send Immediately" for instant delivery
2. **Scheduled Notification**: Set delay in seconds and tap "Schedule Notification"
3. **Repeating Notification**: Set interval and tap "Schedule Repeating"

### Managing Notifications

- View all scheduled notifications in the "Scheduled Notifications" section
- Cancel individual notifications using the "Cancel" button
- Cancel all notifications at once using "Cancel All"

## License

This project is part of the SWE201 course assignments.

## Author

Sonam Wangmo (Student ID: 02240363)
