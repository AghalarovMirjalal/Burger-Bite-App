import { InfoPage } from '../components/InfoPage';

export default function PrivacyScreen() {
  return (
    <InfoPage
      title="Privacy"
      sections={[
        {
          title: 'What we keep',
          text: 'Your name, email, profile photo, cart and order history. That is all we need to get burgers to you.',
        },
        {
          title: 'Where it lives',
          text: 'Everything is stored on this device only. Your password is never saved as plain text — we keep only a SHA-256 hash of it.',
        },
        {
          title: 'Your control',
          text: 'You can change your name and photo in Profile at any time. Logging out ends your session on this device.',
        },
      ]}
    />
  );
}
