# Practical 2: Responsive React Native App (Expo)

## 1. Aim
To design and build a responsive mobile application using React Native and Expo, with adaptive layouts for different screen sizes.

## 2. Objective
- Build a multi-screen app using stack navigation.
- Implement responsive UI behavior using screen dimensions.
- Organize screens and styles in a clean project structure.
- Test app behavior on different device sizes and orientations.

## 3. Learning Outcome
After completing this practical, I was able to:
- Create and manage multiple screens in a React Native app.
- Use responsive design techniques in mobile UI.
- Apply reusable styling and card-based layouts.
- Handle navigation updates when screens are added or removed.
- Debug common Expo bundling and routing issues.

## 4. Requirements
- Node.js and npm installed
- Expo CLI environment
- React Native dependencies from package.json
- Code editor (VS Code)
- Android Emulator, iOS Simulator, or physical device with Expo Go

## 5. Procedure
1. Created a new Expo project and configured folder structure.
2. Implemented stack navigation in [App.js](App.js).
3. Built screens:
	 - [screens/HomeScreen.js](screens/HomeScreen.js)
	 - [screens/DashboardScreen.js](screens/DashboardScreen.js)
	 - [screens/ProfileScreen.js](screens/ProfileScreen.js)
4. Added responsive behavior using useWindowDimensions and conditional styles.
5. Updated Dashboard cards to a fixed 2x2 layout and white card background.
6. Added profile avatar image from [public/images/profile.jpeg](public/images/profile.jpeg).
7. Removed Details screen references to fix bundling and route errors.
8. Tested navigation and UI behavior on different device sizes.

## 6. Program / Code Repository
- Online repository:
	[https://github.com/sowomo123/SWE201_02240363.git](https://github.com/sowomo123/SWE201_02240363.git)
- Practical app folder:
	[Practical2App](.)

## 7. Output (Images)
Sample project images currently in the app:
- Background image: [public/images/background.jpeg](public/images/background.jpeg)
- Profile image: [public/images/profile.jpeg](public/images/profile.jpeg)

For report submission, include screenshots of:
- Home screen on phone size
- Dashboard screen showing 2 rows x 2 columns cards
- Profile screen with avatar image
- Landscape orientation (if possible)

## 8. Observation
- Responsive layout techniques improved readability across device sizes.
- Card-based UI provided a clear and consistent structure.
- Removing unused routes helped prevent runtime and bundling issues.
- Using local image assets made UI customization simple and reliable.

## 9. Problems Encountered
- Bundling failure caused by import of missing screen file.
- Navigation errors when route names did not match available screens.
- Layout inconsistencies before fixing card sizing and wrapping.

## 10. Conclusion
This practical successfully demonstrated how to build a responsive multi-screen mobile application using React Native and Expo. The final app uses clean navigation, adaptive layouts, and local image assets, while handling common development issues such as missing imports and invalid routes.
