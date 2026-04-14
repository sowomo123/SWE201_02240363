# Campus Companion

A React Native mobile application designed to help students navigate campus resources and manage their academic schedule efficiently.

## Features

- **Program Information**: Browse various engineering and academic programs offered by the college
- **Campus Contacts**: Quick access to important campus offices and departments with contact details
- **Weekly Schedule**: Interactive timetable with day-wise class schedules
- **Notice Board**: Campus announcements and important notices (placeholder)

## Technical Architecture

### Navigation Structure
- **Tab Navigation**: Bottom tab navigator for main sections
- **Stack Navigation**: Hierarchical navigation for detailed views
- **Screen Components**: Modular screen components for maintainability

### Key Components

#### AppNavigator
- Configures React Navigation with bottom tabs and stack navigators
- Manages navigation state and screen transitions
- Handles tab styling and icon display

#### HomeScreen
- Displays college programs in a responsive grid layout
- Implements search functionality for program filtering
- Uses FlatList for efficient rendering of program cards

#### ContactsScreen
- Lists essential campus contacts with phone and email
- Implements navigation to contact detail view
- Uses TouchableOpacity for interactive contact items

#### ContactDetailScreen
- Displays detailed contact information
- Receives navigation parameters for selected contact
- Shows avatar with contact initial and contact details

#### ScheduleScreen
- Interactive weekly timetable with day selection
- Dynamic schedule display based on selected day
- Time-based class organization with room information

### Styling System

#### Theme Configuration (`src/styles/theme.js`)
```javascript
// Centralized design tokens for consistent styling
export const colors = {
  primary: '#2E86AB',    // Main brand color
  secondary: '#A23B72',  // Secondary accent
  accent: '#F18F01',     // Highlight color
  // ... semantic colors
};

export const spacing = {
  xs: 4, sm: 8, md: 16, lg: 24, xl: 32
};

export const typography = {
  h1: { fontSize: 24, fontWeight: 'bold' },
  h2: { fontSize: 20, fontWeight: 'bold' },
  // ... typography scale
};
```

### State Management
- **Local State**: Uses React hooks (useState) for component state
- **Navigation State**: React Navigation handles routing state
- **Data**: Static data arrays for contacts, schedule, and programs

### Performance Optimizations
- **FlatList**: Efficient rendering for large lists
- **Memoization**: React.memo for expensive renders (where applicable)
- **Lazy Loading**: Navigation screens load on demand

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- React Native development environment

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd CampusCompanion
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start development server
```bash
npm start
# or
expo start
```

4. Run on device/simulator
- Scan QR code with Expo Go app
- Use `npm run android` or `npm run ios` for native builds

## Project Structure


## Development Guidelines

### Code Style
- Use functional components with hooks
- Implement proper TypeScript types (when applicable)
- Follow React Native best practices
- Maintain consistent naming conventions

### Component Structure
```javascript
// Example component pattern
const ComponentName = ({ prop1, prop2 }) => {
  // State declarations
  const [state, setState] = useState(initialValue);

  // Event handlers
  const handlePress = () => {
    // Handle user interaction
  };

  // Render method
  return (
    <View style={styles.container}>
      {/* Component JSX */}
    </View>
  );
};

export default ComponentName;
```

### Styling Guidelines
- Use StyleSheet.create for performance
- Import from theme for consistency
- Apply responsive design principles
- Use semantic color names

## Data Management

### Static Data Sources
- **Contacts**: Campus office contact information
- **Schedule**: Weekly class timetable by day
- **Programs**: Academic program listings

### Data Structure Examples

#### Contact Item
```javascript
{
  id: '1',
  name: 'Dean of Academic Affairs',
  phone: '(+975) 17548676',
  email: 'dean.academic@rub.edu.bt'
}
```

#### Schedule Item
```javascript
{
  time: '9:00 - 10:00',
  subject: 'DSO101',
  room: 'IT 6'
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes with clear commit messages
4. Test thoroughly on multiple devices
5. Submit a pull request

## Future Enhancements

- [ ] Real-time schedule updates
- [ ] Push notifications for notices
- [ ] Offline mode support
- [ ] Campus map integration
- [ ] User authentication and profiles
- [ ] Cloud sync for personal data

## Troubleshooting

### Common Issues

#### Metro Bundler Issues
```bash
# Clear Metro cache
npx expo start --clear

# Reset cache completely
npx expo start --reset-cache
```

#### Navigation Errors
- Check screen name spelling in navigator
- Verify component imports
- Ensure proper navigation parameter passing

#### Styling Issues
- Verify theme imports
- Check StyleSheet syntax
- Ensure proper color usage

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support regarding this application, please contact the development team at [support email].

---

**Note**: This is a student project developed as part of SWE201 Programming Assignment 1.