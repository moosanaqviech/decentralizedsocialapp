import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Modal,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

// 1. Welcome Screen
const OnboardingWelcome = ({ setOnboardingStep }) => (
  <LinearGradient
    colors={['#3b82f6', '#8b5cf6']}
    style={styles.onboardingContainer}
  >
    <SafeAreaView style={styles.flex1}>
      <View style={styles.onboardingContent}>
        <View style={styles.logoContainer}>
          <Ionicons name="chatbubbles" size={60} color="white" />
        </View>
        
        <Text style={styles.welcomeTitle}>Welcome to the Future of Messaging</Text>
        <Text style={styles.welcomeSubtitle}>
          Your messages. Your data. Your choice.{'\n'}
          Decentralized • Encrypted • User-Owned
        </Text>
        
        <View style={styles.featureList}>
          <View style={styles.featureItem}>
            <Ionicons name="shield-checkmark" size={20} color="#86efac" />
            <Text style={styles.featureText}>End-to-end encrypted by default</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="globe-outline" size={20} color="#93c5fd" />
            <Text style={styles.featureText}>Choose your own server provider</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="refresh" size={20} color="#c084fc" />
            <Text style={styles.featureText}>Switch providers anytime</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="people" size={20} color="#fde047" />
            <Text style={styles.featureText}>Message anyone on any server</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.onboardingFooter}>
        <TouchableOpacity
          onPress={() => setOnboardingStep(1)}
          style={styles.getStartedButton}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>
          Takes less than 2 minutes • No technical knowledge required
        </Text>
      </View>
    </SafeAreaView>
  </LinearGradient>
);

// 2. Server Selection Screen
const OnboardingServerChoice = ({ serverOptions, setSelectedServer, setOnboardingStep }) => (
  <SafeAreaView style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity onPress={() => setOnboardingStep(0)}>
        <Ionicons name="arrow-back" size={24} color="#3b82f6" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Choose Your Provider</Text>
      <View style={styles.headerSpacer} />
    </View>
    
    <Text style={styles.headerSubtitle}>Like choosing Gmail vs Yahoo for email</Text>

    <ScrollView style={styles.serverList} showsVerticalScrollIndicator={false}>
      <View style={styles.quickStartCard}>
        <View style={styles.quickStartHeader}>
          <Ionicons name="flash" size={20} color="#059669" />
          <Text style={styles.quickStartTitle}>Quick Start (Recommended)</Text>
        </View>
        <Text style={styles.quickStartSubtitle}>
          We'll pick the best server for your location and needs
        </Text>
        <TouchableOpacity
          onPress={() => {
            setSelectedServer(serverOptions[0]);
            setOnboardingStep(2);
          }}
          style={styles.quickStartButton}
        >
          <Text style={styles.quickStartButtonText}>Auto-Select Best Server</Text>
        </TouchableOpacity>
      </View>

      {serverOptions.map((server) => (
        <View key={server.id} style={styles.serverCard}>
          <View style={styles.serverNameRow}>
            <Text style={styles.serverName}>{server.name}</Text>
            {server.recommended && (
              <View style={styles.recommendedBadge}>
                <Text style={styles.recommendedText}>Recommended</Text>
              </View>
            )}
          </View>
          <Text style={styles.serverDetails}>{server.price} • {server.location}</Text>
          
          <TouchableOpacity
            onPress={() => {
              setSelectedServer(server);
              setOnboardingStep(2);
            }}
            style={styles.chooseButton}
          >
            <Text style={styles.chooseButtonText}>Choose {server.name}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  </SafeAreaView>
);

// 3. Registration Type Selection
const RegistrationTypeSelector = ({ setOnboardingStep, selectedServer, setRegistrationType, setPhoneStep }) => (
  <SafeAreaView style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity onPress={() => setOnboardingStep(1)}>
        <Ionicons name="arrow-back" size={24} color="#3b82f6" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Choose Registration Method</Text>
      <View style={styles.headerSpacer} />
    </View>

    <View style={styles.registrationChoice}>
      <View style={styles.serverSelectedBanner}>
        <Ionicons name="server" size={16} color="#3b82f6" />
        <Text style={styles.serverSelectedText}>
          Selected: {selectedServer?.name} • {selectedServer?.price}
        </Text>
      </View>

      <Text style={styles.choiceTitle}>How would you like to sign up?</Text>
      <Text style={styles.choiceSubtitle}>
        Both options give you full decentralized messaging
      </Text>
      
      <TouchableOpacity 
        style={styles.registrationOption}
        onPress={() => {
          setRegistrationType('phone');
          setPhoneStep('phone');
          setOnboardingStep(3);
        }}
      >
        <View style={styles.optionIcon}>
          <Ionicons name="call" size={28} color="#3b82f6" />
        </View>
        <View style={styles.optionContent}>
          <Text style={styles.optionTitle}>Phone Number</Text>
          <Text style={styles.optionSubtitle}>Like WhatsApp - find friends easily</Text>
          <View style={styles.optionFeatures}>
            <Text style={styles.featurePoint}>• Easy contact discovery</Text>
            <Text style={styles.featurePoint}>• Familiar experience</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.registrationOption}
        onPress={() => {
          setRegistrationType('username');
          setOnboardingStep(3);
        }}
      >
        <View style={[styles.optionIcon, { backgroundColor: '#ecfdf5' }]}>
          <Ionicons name="person" size={28} color="#059669" />
        </View>
        <View style={styles.optionContent}>
          <Text style={styles.optionTitle}>Username Only</Text>
          <Text style={styles.optionSubtitle}>Maximum privacy - no phone required</Text>
          <View style={styles.optionFeatures}>
            <Text style={styles.featurePoint}>• Complete anonymity</Text>
            <Text style={styles.featurePoint}>• No SMS verification</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
      </TouchableOpacity>

      <View style={styles.privacyNote}>
        <Ionicons name="shield-checkmark" size={20} color="#059669" />
        <Text style={styles.privacyNoteText}>
          Either way, your data stays on {selectedServer?.name}, not with us. 
          You can switch servers anytime.
        </Text>
      </View>
    </View>
  </SafeAreaView>
);

// Country Picker Component
const CountryPicker = ({ isVisible, onClose, onSelect, countries }) => {
  const [search, setSearch] = useState('');
  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Modal animationType="slide" transparent={false} visible={isVisible}>
      <SafeAreaView style={styles.countryPickerContainer}>
        <View style={styles.countryPickerHeader}>
          <TouchableOpacity onPress={onClose} style={styles.countryPickerCloseButton}>
            <Ionicons name="close" size={24} color="#3b82f6" />
          </TouchableOpacity>
          <Text style={styles.countryPickerTitle}>Select your country</Text>
          <View style={styles.countryPickerCloseButton} /> { /* Spacer */ }
        </View>
        <TextInput
          style={styles.countryPickerSearchInput}
          placeholder="Search country"
          value={search}
          onChangeText={setSearch}
        />
        <FlatList
          data={filteredCountries}
          keyExtractor={(item) => item.cca2}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.countryPickerItem}
              onPress={() => {
                onSelect(item);
                onClose();
              }}
            >
              <Text style={styles.countryPickerItemText}>
                {item.flag} {item.name} (+{item.callingCode})
              </Text>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </Modal>
  );
};

// 4A. Phone Registration Flow
const PhoneRegistration = ({
  phoneNumber,
  setPhoneNumber,
  verificationCode,
  setVerificationCode,
  phoneStep,
  setPhoneStep,
  setOnboardingStep,
  selectedServer,
  displayName,
  setDisplayName,
  setUser,
  setCurrentView,
  isCountryPickerVisible,
  setCountryPickerVisible,
  selectedCountry,
  setSelectedCountry,
  countries
}) => {
  const sendVerificationCode = async () => {
    try {
      const fullPhoneNumber = `+${selectedCountry.callingCode}${phoneNumber}`;
      await sendSmsVerification(fullPhoneNumber);
      Alert.alert(
        "Verification Code Sent", 
        `Code sent to ${fullPhoneNumber}\n\n🔥 Demo Mode: Use code "123456"`,
        [{ text: "Got it!", onPress: () => setPhoneStep('verify') }]
      );
    } catch (error) {
      Alert.alert("Error", "Failed to send verification code");
    }
  };

  const verifyCode = async () => {
    try {
      if (verificationCode === '123456') {
        setPhoneStep('profile');
      } else {
        Alert.alert("Invalid Code", "Please try again or use demo code: 123456");
      }
    } catch (error) {
      Alert.alert("Error", "Verification failed");
    }
  };

  const createPhoneAccount = async () => {
    try {
      const phoneDigits = phoneNumber.replace(/\D/g, '');
      setUser({
        name: displayName || 'You',
        username: phoneDigits,
        avatar: '📱',
        server: selectedServer.name.toLowerCase(),
        status: 'online',
        isSetup: true,
        phoneNumber: phoneNumber,
        registrationType: 'phone'
      });
      setCurrentView('home');
    } catch (error) {
      Alert.alert("Error", "Account creation failed");
    }
  };

  // Phone Number Input
  if (phoneStep === 'phone') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setOnboardingStep(2)}>
            <Ionicons name="arrow-back" size={24} color="#3b82f6" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Enter Your Phone Number</Text>
          <View style={styles.headerSpacer} />
        </View>
        
        <Text style={styles.headerSubtitle}>
          We'll send a verification code to confirm it's you
        </Text>

        <View style={styles.form}>
          <View style={styles.serverInfo}>
            <Ionicons name="server" size={20} color="#3b82f6" />
            <Text style={styles.serverText}>
              Registering with {selectedServer?.name}
            </Text>
          </View>

          <View style={styles.phoneContainer}>
            <TouchableOpacity 
              style={styles.countryCode}
              onPress={() => setCountryPickerVisible(true)}
            >
              <Text style={styles.countryCodeText}>
                {selectedCountry.flag} +{selectedCountry.callingCode}
              </Text>
            </TouchableOpacity>
            <TextInput
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="(555) 123-4567"
              keyboardType="phone-pad"
              style={styles.phoneInput}
              maxLength={15}
            />
          </View>

          <View style={styles.phonePrivacyNote}>
            <Ionicons name="shield-checkmark" size={16} color="#059669" />
            <Text style={styles.privacyText}>
              Your phone number stays with {selectedServer?.name}, not with us
            </Text>
          </View>

          <TouchableOpacity
            onPress={sendVerificationCode}
            disabled={phoneNumber.length < 10}
            style={[
              styles.continueButton,
              phoneNumber.length < 10 && styles.disabledButton
            ]}
          >
            <Text style={styles.buttonText}>Send Verification Code</Text>
          </TouchableOpacity>
        </View>
        <CountryPicker
          isVisible={isCountryPickerVisible}
          onClose={() => setCountryPickerVisible(false)}
          onSelect={(country) => setSelectedCountry(country)}
          countries={countries}
        />
      </SafeAreaView>
    );
  }

  // SMS Verification
  if (phoneStep === 'verify') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setPhoneStep('phone')}>
            <Ionicons name="arrow-back" size={24} color="#3b82f6" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Enter Verification Code</Text>
          <View style={styles.headerSpacer} />
        </View>
        
        <Text style={styles.headerSubtitle}>
          Code sent to {phoneNumber}
        </Text>

        <View style={styles.form}>
          <TextInput
            value={verificationCode}
            onChangeText={setVerificationCode}
            placeholder="123456"
            keyboardType="number-pad"
            style={styles.codeInput}
            maxLength={6}
            textAlign="center"
          />

          <TouchableOpacity
            onPress={verifyCode}
            disabled={verificationCode.length < 6}
            style={[
              styles.continueButton,
              verificationCode.length < 6 && styles.disabledButton
            ]}
          >
            <Text style={styles.buttonText}>Verify Code</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={sendVerificationCode}
            style={styles.resendButton}
          >
            <Text style={styles.resendText}>Resend Code</Text>
          </TouchableOpacity>

          <View style={styles.demoHint}>
            <Text style={styles.demoText}>💡 Demo: Use code "123456"</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // Profile Completion
  if (phoneStep === 'profile') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setPhoneStep('verify')}>
            <Ionicons name="arrow-back" size={24} color="#3b82f6" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Complete Your Profile</Text>
          <View style={styles.headerSpacer} />
        </View>
        
        <Text style={styles.headerSubtitle}>
          How should others see you?
        </Text>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Display Name</Text>
            <TextInput
              value={displayName}
              onChangeText={setDisplayName}
              placeholder="Your name"
              style={styles.textInput}
            />
          </View>

          <View style={styles.accountPreview}>
            <Text style={styles.previewLabel}>Your Decentralized ID:</Text>
            <Text style={styles.previewId}>
              {phoneNumber.replace(/\D/g, '')}@{selectedServer?.name.toLowerCase()}
            </Text>
            <Text style={styles.previewNote}>
              ✨ You can message anyone on any server with this ID
            </Text>
          </View>

          <TouchableOpacity
            onPress={createPhoneAccount}
            disabled={!displayName.trim()}
            style={[
              styles.continueButton,
              !displayName.trim() && styles.disabledButton
            ]}
          >
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return null;
};

// 4B. Username Registration (Original Flow)
const UsernameRegistration = ({ setOnboardingStep, selectedServer, displayName, setDisplayName, userName, setUserName, recoveryEmail, setRecoveryEmail, setUser, setCurrentView }) => (
  <SafeAreaView style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity onPress={() => setOnboardingStep(2)}>
        <Ionicons name="arrow-back" size={24} color="#3b82f6" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Create Your Account</Text>
      <View style={styles.headerSpacer} />
    </View>

    <ScrollView style={styles.setupForm}>
      <View style={styles.selectedServerCard}>
        <Text style={styles.selectedServerTitle}>Selected: {selectedServer?.name}</Text>
        <Text style={styles.selectedServerDetails}>{selectedServer?.price}</Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Display Name</Text>
        <TextInput
          value={displayName}
          onChangeText={setDisplayName}
          placeholder="Your full name"
          style={styles.textInput}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Username</Text>
        <TextInput
          value={userName}
          onChangeText={setUserName}
          placeholder="username"
          style={styles.textInput}
        />
        <Text style={styles.helpText}>
          Your ID: {userName || 'username'}@{selectedServer?.name.toLowerCase()}
        </Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Recovery Email</Text>
        <TextInput
          value={recoveryEmail}
          onChangeText={setRecoveryEmail}
          placeholder="your.email@example.com"
          keyboardType="email-address"
          style={styles.textInput}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          setUser({
            name: displayName || 'You',
            username: userName || 'user',
            avatar: '👤',
            server: selectedServer.name.toLowerCase(),
            status: 'online',
            isSetup: true,
            registrationType: 'username'
          });
          setCurrentView('home');
        }}
        disabled={!displayName || !userName || !recoveryEmail}
        style={[
          styles.createAccountButton,
          (!displayName || !userName || !recoveryEmail) && styles.disabledButton
        ]}
      >
        <Text style={styles.createAccountText}>Create Account</Text>
      </TouchableOpacity>
    </ScrollView>
  </SafeAreaView>
);

const countries = [
  { cca2: 'US', callingCode: '1', flag: '🇺🇸', name: 'United States' },
  { cca2: 'CA', callingCode: '1', flag: '🇨🇦', name: 'Canada' },
  { cca2: 'GB', callingCode: '44', flag: '🇬🇧', name: 'United Kingdom' },
  { cca2: 'AU', callingCode: '61', flag: '🇦🇺', name: 'Australia' },
  { cca2: 'DE', callingCode: '49', flag: '🇩🇪', name: 'Germany' },
  { cca2: 'FR', callingCode: '33', flag: '🇫🇷', name: 'France' },
  { cca2: 'JP', callingCode: '81', flag: '🇯🇵', name: 'Japan' },
  { cca2: 'IN', callingCode: '91', flag: '🇮🇳', name: 'India' },
];

// Mock API call for sending SMS verification
const sendSmsVerification = async (phoneNumber) => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`[MOCK API] Sending SMS to ${phoneNumber}`);
      resolve({ success: true });
    }, 1500);
  });
};

export default function App() {
  const [currentView, setCurrentView] = useState('onboarding');
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  
  // Onboarding states
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [selectedServer, setSelectedServer] = useState(null);
  const [registrationType, setRegistrationType] = useState(null); // 'phone' | 'username'
  
  // Phone registration states
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [phoneStep, setPhoneStep] = useState('phone'); // 'phone' | 'verify' | 'profile'
  
  // Username registration states
  const [userName, setUserName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [recoveryEmail, setRecoveryEmail] = useState('');
  
  const [user, setUser] = useState({
    name: 'Sarah Chen',
    username: 'sarah',
    avatar: '👩‍💻',
    server: 'securechat.com',
    status: 'online',
    isSetup: false
  });

  // Country Picker states
  const [isCountryPickerVisible, setCountryPickerVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    cca2: 'US',
    callingCode: '1',
    flag: '🇺🇸'
  });

  // Mock server options
  const serverOptions = [
    {
      id: 'securechat',
      name: 'SecureChat.com',
      price: '$3/month',
      features: ['99.9% uptime', 'EU privacy laws', 'Backup included', '24/7 support'],
      rating: 4.8,
      location: '🇪🇺 EU-based',
      recommended: true,
    },
    {
      id: 'privacyfirst',
      name: 'PrivacyFirst.net',
      price: '$5/month',
      features: ['No logs policy', 'Swiss jurisdiction', 'Advanced features', 'Crypto payments'],
      rating: 4.9,
      location: '🇨🇭 Switzerland',
      recommended: false,
    },
    {
      id: 'communitybridge',
      name: 'CommunityBridge.org',
      price: 'Free',
      features: ['Donation funded', 'Open source', 'Basic features', 'Community support'],
      rating: 4.5,
      location: '🌍 Global',
      recommended: false,
    }
  ];

  // Mock chat data
  const [chats] = useState([
    {
      id: 1,
      name: 'Privacy Advocates',
      lastMessage: 'End-to-end encryption is essential! 🔒',
      timestamp: '2m ago',
      unread: 3,
      encrypted: true,
      avatar: '🛡️',
    },
    {
      id: 2,
      name: 'Alex Rodriguez',
      lastMessage: 'Hey! How is the decentralized setup going?',
      timestamp: '5m ago',
      unread: 1,
      encrypted: true,
      status: 'online',
      avatar: '👨‍💼',
    },
    {
      id: 3,
      name: 'Tech Community',
      lastMessage: 'Welcome! The future is decentralized 🎉',
      timestamp: '1h ago',
      unread: 0,
      encrypted: true,
      avatar: '💻',
    }
  ]);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Alex Rodriguez',
      content: 'Hey! How is the decentralized setup going?',
      timestamp: '5m ago',
      encrypted: true,
    },
    {
      id: 2,
      sender: 'You',
      content: 'Amazing! I love having control over my own data.',
      timestamp: '4m ago',
      encrypted: true,
    }
  ]);

  // MAIN APP COMPONENTS

  // Status Bar Component
  const StatusBarComponent = () => (
    <LinearGradient
      colors={['#3b82f6', '#8b5cf6']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.statusBar}
    >
      <View style={styles.statusBarContent}>
        <Ionicons name="wifi" size={16} color="white" />
        <Text style={styles.statusBarText}>Connected • {user.server}</Text>
      </View>
      <View style={styles.encryptedStatus}>
        <Ionicons name="shield-checkmark" size={16} color="#86efac" />
        <Text style={styles.encryptedStatusText}>Encrypted</Text>
      </View>
    </LinearGradient>
  );

  // Home View
  const HomeView = () => (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent />
      
      <View style={styles.homeHeader}>
        <View style={styles.homeHeaderTop}>
          <Text style={styles.homeTitle}>Messages</Text>
          <View style={styles.homeHeaderIcons}>
            <TouchableOpacity>
              <Ionicons name="search" size={24} color="#6b7280" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton}>
              <Ionicons name="add" size={24} color="#3b82f6" />
            </TouchableOpacity>
          </View>
        </View>
        
        <TouchableOpacity style={styles.userProfile}>
          <View style={styles.userAvatar}>
            <Text style={styles.avatarText}>{user.avatar}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userHandle}>
              {user.phoneNumber ? `📱 ${user.phoneNumber}` : `${user.username}@${user.server}`}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.chatList}>
        {chats.map((chat) => (
          <TouchableOpacity
            key={chat.id}
            onPress={() => {
              setSelectedChat(chat);
              setCurrentView('chat');
            }}
            style={styles.chatItem}
          >
            <View style={styles.chatAvatar}>
              <Text style={styles.chatAvatarText}>{chat.avatar}</Text>
              {chat.encrypted && (
                <View style={styles.encryptionBadge}>
                  <Ionicons name="lock-closed" size={8} color="white" />
                </View>
              )}
            </View>
            
            <View style={styles.chatContent}>
              <View style={styles.chatHeader}>
                <Text style={styles.chatName}>{chat.name}</Text>
                <Text style={styles.chatTimestamp}>{chat.timestamp}</Text>
              </View>
              <Text style={styles.chatMessage} numberOfLines={1}>{chat.lastMessage}</Text>
            </View>
            
            {chat.unread > 0 && (
              <View style={styles.unreadBadge}>
                  <Text style={styles.unreadCount}>{chat.unread}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={20} color="#3b82f6" />
          <Text style={[styles.navText, { color: '#3b82f6' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="people" size={20} color="#6b7280" />
          <Text style={styles.navText}>Communities</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="settings" size={20} color="#6b7280" />
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  // Chat View
  const ChatView = () => (
    <SafeAreaView style={styles.container}>
      <View style={styles.chatHeaderContainer}>
        <TouchableOpacity onPress={() => setCurrentView('home')}>
          <Ionicons name="arrow-back" size={24} color="#3b82f6" />
        </TouchableOpacity>
        <Text style={styles.chatHeaderTitle}>{selectedChat?.name}</Text>
        <TouchableOpacity>
          <Ionicons name="call" size={20} color="#6b7280" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.messagesContainer}>
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageContainer,
              msg.sender === 'You' ? styles.myMessage : styles.theirMessage
            ]}
          >
            <View style={[
              styles.messageBubble,
              msg.sender === 'You' ? styles.myMessageBubble : styles.theirMessageBubble
            ]}>
              <Text style={[
                styles.messageText,
                msg.sender === 'You' ? styles.myMessageText : styles.theirMessageText
              ]}>
                {msg.content}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.messageInputContainer}
      >
        <View style={styles.messageInputRow}>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            style={styles.messageInput}
            multiline
          />
          <TouchableOpacity
            onPress={() => {
              if (message.trim()) {
                const newMessage = {
                  id: messages.length + 1,
                  sender: 'You',
                  content: message,
                  timestamp: 'now',
                  encrypted: true,
                };
                setMessages([...messages, newMessage]);
                setMessage('');
              }
            }}
            style={styles.sendButton}
          >
            <Ionicons name="send" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );

  // MAIN RENDER
  return (
    <View style={styles.app}>
      <StatusBar style="light" />
      
      {currentView === 'onboarding' && (
        <>
          {onboardingStep === 0 && <OnboardingWelcome setOnboardingStep={setOnboardingStep} />}
          {onboardingStep === 1 && <OnboardingServerChoice 
            serverOptions={serverOptions}
            setSelectedServer={setSelectedServer}
            setOnboardingStep={setOnboardingStep}
          />}
          {onboardingStep === 2 && <RegistrationTypeSelector 
            setOnboardingStep={setOnboardingStep}
            selectedServer={selectedServer}
            setRegistrationType={setRegistrationType}
            setPhoneStep={setPhoneStep}
          />}
          {onboardingStep === 3 && registrationType === 'phone' && 
            <PhoneRegistration 
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              verificationCode={verificationCode}
              setVerificationCode={setVerificationCode}
              phoneStep={phoneStep}
              setPhoneStep={setPhoneStep}
              setOnboardingStep={setOnboardingStep}
              selectedServer={selectedServer}
              displayName={displayName}
              setDisplayName={setDisplayName}
              setUser={setUser}
              setCurrentView={setCurrentView}
              isCountryPickerVisible={isCountryPickerVisible}
              setCountryPickerVisible={setCountryPickerVisible}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              countries={countries}
            />
          }
          {onboardingStep === 3 && registrationType === 'username' && 
            <UsernameRegistration 
              setOnboardingStep={setOnboardingStep}
              selectedServer={selectedServer}
              displayName={displayName}
              setDisplayName={setDisplayName}
              userName={userName}
              setUserName={setUserName}
              recoveryEmail={recoveryEmail}
              setRecoveryEmail={setRecoveryEmail}
              setUser={setUser}
              setCurrentView={setCurrentView}
            />
          }
        </>
      )}
      {currentView === 'home' && <HomeView />}
      {currentView === 'chat' && <ChatView />}
    </View>
  );
}


const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  flex1: {
    flex: 1,
  },
  
  // Onboarding Styles
  onboardingContainer: {
    flex: 1,
  },
  onboardingContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  logoContainer: {
    width: 96,
    height: 96,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
  welcomeSubtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  featureList: {
    marginBottom: 48,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureText: {
    color: 'white',
    marginLeft: 12,
    fontSize: 16,
  },
  onboardingFooter: {
    paddingHorizontal: 32,
    paddingBottom: 32,
  },
  getStartedButton: {
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 16,
  },
  getStartedText: {
    color: '#8b5cf6',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    textAlign: 'center',
  },
  
  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 32,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: 'white',
  },
  
  // Server Selection Styles
  serverList: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  quickStartCard: {
    backgroundColor: '#ecfdf5',
    borderWidth: 2,
    borderColor: '#10b981',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  quickStartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickStartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#065f46',
    marginLeft: 12,
  },
  quickStartSubtitle: {
    fontSize: 14,
    color: '#047857',
    marginBottom: 12,
  },
  quickStartButton: {
    backgroundColor: '#059669',
    paddingVertical: 12,
    borderRadius: 8,
  },
  quickStartButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  serverCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    marginBottom: 16,
  },
  serverNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  serverName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  recommendedBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 8,
  },
  recommendedText: {
    fontSize: 10,
    color: '#166534',
  },
  serverDetails: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  chooseButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 8,
    borderRadius: 8,
  },
  chooseButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  
  // Account Setup Styles
  setupForm: {
    flex: 1,
    paddingHorizontal: 24,
  },
  selectedServerCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    marginBottom: 24,
  },
  selectedServerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  selectedServerDetails: {
    fontSize: 14,
    color: '#6b7280',
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
  },
  helpText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  createAccountButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 32,
  },
  disabledButton: {
    backgroundColor: '#d1d5db',
  },
  createAccountText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  
  // Status Bar Styles
  statusBar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBarText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  encryptedStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  encryptedStatusText: {
    color: '#86efac',
    fontSize: 12,
    marginLeft: 4,
  },
  
  // Home View Styles
  homeHeader: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  homeHeaderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  homeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  homeHeaderIcons: {
    flexDirection: 'row',
  },
  addButton: {
    marginLeft: 16,
  },
  userProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
  },
  userAvatar: {
    width: 40,
    height: 40,
    backgroundColor: '#3b82f6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  userHandle: {
    fontSize: 14,
    color: '#6b7280',
  },
  
  // Chat List Styles
  chatList: {
    flex: 1,
  },
  chatItem: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatAvatar: {
    width: 48,
    height: 48,
    backgroundColor: '#3b82f6',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    position: 'relative',
  },
  chatAvatarText: {
    fontSize: 20,
  },
  encryptionBadge: {
    width: 16,
    height: 16,
    backgroundColor: '#059669',
    borderRadius: 8,
    position: 'absolute',
    top: -4,
    right: -4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  chatTimestamp: {
    fontSize: 12,
    color: '#6b7280',
  },
  chatMessage: {
    fontSize: 14,
    color: '#6b7280',
  },
  unreadBadge: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadCount: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  
  // Chat View Styles
  chatHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  chatHeaderTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
    textAlign: 'center',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  messageContainer: {
    marginBottom: 16,
  },
  myMessage: {
    alignItems: 'flex-end',
  },
  theirMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
  },
  myMessageBubble: {
    backgroundColor: '#3b82f6',
  },
  theirMessageBubble: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  myMessageText: {
    color: 'white',
  },
  theirMessageText: {
    color: '#111827',
  },
  
  // Message Input Styles
  messageInputContainer: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  messageInputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  messageInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    maxHeight: 100,
    marginRight: 12,
    backgroundColor: 'white',
  },
  sendButton: {
    backgroundColor: '#3b82f6',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Registration Choice Styles
  registrationChoice: {
    paddingHorizontal: 24,
    flex: 1,
    paddingTop: 16,
  },
  serverSelectedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eff6ff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 32,
  },
  serverSelectedText: {
    marginLeft: 6,
    fontSize: 12,
    color: '#1d4ed8',
    fontWeight: '500',
  },
  choiceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  choiceSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  registrationOption: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    width: 56,
    height: 56,
    backgroundColor: '#eff6ff',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  optionFeatures: {
    marginTop: 4,
  },
  featurePoint: {
    fontSize: 12,
    color: '#059669',
    marginBottom: 2,
  },
  privacyNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 24,
  },
  privacyNoteText: {
    marginLeft: 12,
    fontSize: 12,
    color: '#166534',
    flex: 1,
    lineHeight: 18,
  },
  
  // Phone Registration Styles
  form: {
    paddingHorizontal: 24,
    flex: 1,
  },
  serverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eff6ff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 32,
  },
  serverText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#1d4ed8',
    fontWeight: '500',
  },
  phoneContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  countryCode: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRightWidth: 0,
  },
  countryCodeText: {
    fontSize: 16,
    color: '#374151',
  },
  phoneInput: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    borderLeftWidth: 0,
  },
  phonePrivacyNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 24,
  },
  privacyText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#166534',
    flex: 1,
  },
  continueButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  disabledButton: {
    backgroundColor: '#d1d5db',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  codeInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingVertical: 20,
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: 8,
    marginBottom: 24,
  },
  resendButton: {
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  resendText: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '500',
  },
  demoHint: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  demoText: {
    fontSize: 12,
    color: '#92400e',
    fontWeight: '500',
  },
  accountPreview: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  previewLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748b',
    marginBottom: 4,
  },
  previewId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  previewNote: {
    fontSize: 12,
    color: '#059669',
    fontStyle: 'italic',
  },
  debugText: {
    fontSize: 12,
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  
  // Bottom Navigation Styles
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  countryPickerContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    backgroundColor: '#f9fafb',
  },
  countryPickerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    backgroundColor: 'white',
  },
  countryPickerCloseButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countryPickerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  countryPickerSearchInput: {
    height: 50,
    borderColor: '#e5e7eb',
    borderWidth: 1,
    borderRadius: 8,
    margin: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: 'white',
  },
  countryPickerItem: {
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  countryPickerItemText: {
    fontSize: 16,
    color: '#111827',
  },
});