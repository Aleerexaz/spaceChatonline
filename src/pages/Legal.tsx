import { Link } from 'react-router'
import LegalLayout from './LegalLayout'
import { APP } from '@/config'

export function Privacy() {
  return (
    <LegalLayout kicker="Privacy" title={['There is no server.', 'This says what that means.']} intro="SpaceChat has no accounts and no company server that holds your chats. This page covers what the app keeps, what other phones see, and what the website does.">
      <section>
        <h2>The short version</h2>
        <p>Your keys live on your phone. Your history lives on your phone. We never receive your messages, voice notes, photos or files, so we cannot read them, recover them, or hand them over. If you uninstall SpaceChat or clear its storage, this device forgets everything.</p>
      </section>
      <section>
        <h2>What stays on your phone</h2>
        <ul>
          <li>The name you chose, and the letter orb made from it.</li>
          <li>Your keys, and the list of people you are linked with.</li>
          <li>Your chats: text, voice notes, photos and files, until they expire.</li>
          <li>Your settings: star color, the message timer, and storage.</li>
        </ul>
      </section>
      <section>
        <h2>What other phones see</h2>
        <p>While Discover is open, your phone tells phones nearby that it is there, with the name you chose. They see you as a star on their map. A link starts only when someone asks and the other person accepts. Nobody is drawing your location, and nothing is uploaded.</p>
      </section>
      <section>
        <h2>How long messages last</h2>
        <p>Messages expire after 12, 24, or 48 hours. The default is 24 hours. Each phone keeps its own clock: your setting decides how long chats stay on your device. We cannot make another person's phone forget, and a person can still save a file or photograph a screen, so share with people you trust.</p>
      </section>
      <section>
        <h2>Files, and the phone in the middle</h2>
        <p>A file between two phones in the same group travels over a direct Wi-Fi link, from inside the chat. One phone owns that group. A file between two members goes to the owner and then across. A file for someone outside the group is sealed for them and carried over, and the phone in the middle delivers it. That phone is not the person the file was written for.</p>
      </section>
      <section>
        <h2>Encryption</h2>
        <p>End-to-end encryption is active between linked phones. The keys are made on your phone and stay there. Because we hold no copy, a lost or wiped phone cannot be restored from us.</p>
      </section>
      <section>
        <h2>Permissions</h2>
        <p>Android asks before SpaceChat can use Bluetooth, nearby Wi-Fi devices, the microphone, the camera, your photos and files, or notifications. <Link className="tlink" to="/permissions">The permissions page</Link> names each one and why it is there.</p>
      </section>
      <section>
        <h2>This website and the download</h2>
        <p>This website has no accounts, no advertising and no analytics. Its fonts are served from the site itself. The file you download is served by our web host, which may keep ordinary server logs such as the time, your IP address and the file requested.</p>
      </section>
      <section>
        <h2>Changes</h2>
        <p>If this policy changes, the date at the top changes with it. Personal use of SpaceChat is free. There is no feed and no advertising.</p>
      </section>
    </LegalLayout>
  )
}

export function Terms() {
  return (
    <LegalLayout kicker="Terms" title={['The terms,', 'in plain words.']} intro="These terms cover installing and using SpaceChat for Android. By installing it you agree to them, and to the acceptable use rules.">
      <section>
        <h2>Using SpaceChat</h2>
        <p>SpaceChat is free for personal use. You may install it on your own devices and use it to talk with people who have chosen to link with you. Follow the <Link className="tlink" to="/acceptable-use">acceptable use</Link> rules. Do not copy, resell, or take the app apart, except where the law lets you.</p>
      </section>
      <section>
        <h2>Installing from your browser</h2>
        <p>Android {APP.version} is a direct-install build. It is signed for sideloading, not with a Google Play app-signing key. Android will ask you to allow the install from your browser. That is your choice, and you can allow it for this file only.</p>
        <ul>
          <li>Only install a file whose SHA-256 matches the one on the <Link className="tlink" to="/download">download page</Link>.</li>
          <li>When a Play listing exists, install that build instead.</li>
          <li>You install at your own risk, and you are responsible for the setting you change on your phone.</li>
        </ul>
      </section>
      <section>
        <h2>Your chats are yours</h2>
        <p>What you send stays on the phones involved. We do not host, copy or moderate it. You are responsible for what you send and for the people you link with.</p>
      </section>
      <section>
        <h2>No server, no safety net</h2>
        <p>Because there is no account and no server, we cannot recover a lost chat, restore a wiped phone, or reset a lost key. Messages expire on the timer you set.</p>
      </section>
      <section>
        <h2>What this release is</h2>
        <p>This is Android {APP.version}. iOS and desktop are coming soon. Coming soon is a direction, not a promise of a date.</p>
      </section>
      <section>
        <h2>No warranty</h2>
        <p>SpaceChat is provided as it is. Radio links depend on the phones, the room and the walls, and can fail. To the extent the law allows, we are not liable for lost messages, failed transfers, or damage from using the app.</p>
      </section>
      <section>
        <h2>Ending and changes</h2>
        <p>You can stop at any time by uninstalling the app. We may update these terms; the date at the top shows when.</p>
      </section>
    </LegalLayout>
  )
}

export function AcceptableUse() {
  return (
    <LegalLayout kicker="Acceptable use" title={['Be a good', 'neighbor.']} intro="SpaceChat puts you in touch with people in the same place. These rules keep that room safe. Because we hold no copy of your chats, we cannot review them, so the rules are yours to keep.">
      <section>
        <h2>Do</h2>
        <ul>
          <li>Link with people who know you are asking, and take no for an answer.</li>
          <li>Use a name that is yours, or one that does not pretend to be someone else.</li>
          <li>Leave the link when a conversation is over.</li>
        </ul>
      </section>
      <section>
        <h2>Do not</h2>
        <ul>
          <li>Harass, threaten, or pressure anyone, or keep asking after a decline.</li>
          <li>Use SpaceChat to follow, track, or locate a person who has not agreed.</li>
          <li>Send sexual content involving a minor. This is never allowed, and you should report it to the authorities.</li>
          <li>Send malware, or files meant to harm another person's phone.</li>
          <li>Impersonate another person or a place.</li>
          <li>Flood people with link requests, or interfere with other people's radios or devices.</li>
          <li>Send anything that is illegal where you are.</li>
        </ul>
      </section>
      <section>
        <h2>If something goes wrong</h2>
        <p>Decline the request or end the link, and leave the room if you need to. If someone is in danger, contact local emergency services. If it happens somewhere that has staff, such as a school, a venue or an event, tell the people responsible for that place.</p>
      </section>
    </LegalLayout>
  )
}

const PERMS = [
  { name: 'Nearby devices (Bluetooth)', android: 'BLUETOOTH_SCAN · BLUETOOTH_ADVERTISE · BLUETOOTH_CONNECT', why: 'Discover draws a star for each phone it can see, other phones can see yours, and the friendship link between two phones is held over Bluetooth.', note: 'Used for SpaceChat’s phone-to-phone links.' },
  { name: 'Nearby Wi-Fi devices', android: 'NEARBY_WIFI_DEVICES', why: 'Forms the direct Wi-Fi link that carries a file between phones, from inside the chat.', note: 'The link is phone to phone. It does not go through a router or the internet.' },
  { name: 'Location', android: 'ACCESS_FINE_LOCATION', why: 'On some Android versions, Android itself requires location access before an app may scan for nearby Bluetooth or Wi-Fi devices.', note: 'SpaceChat does not read your location, store it, upload it, or draw it on the map.' },
  { name: 'Microphone', android: 'RECORD_AUDIO', why: 'Records a voice note when you ask it to.', note: 'It is not used when you are not recording.' },
  { name: 'Camera', android: 'CAMERA', why: 'Takes a photo from the plus menu in a chat.', note: 'Photos are sent only when you send them.' },
  { name: 'Photos, media and files', android: 'READ_MEDIA_IMAGES · file picker', why: 'Lets you attach a picture or a file to a chat.', note: 'SpaceChat sends only what you choose.' },
  { name: 'Notifications', android: 'POST_NOTIFICATIONS', why: 'Tells you about a new message or a link request.', note: 'The text of a notification stays on your phone.' },
  { name: 'Running in the background', android: 'FOREGROUND_SERVICE', why: 'Keeps a link alive and lets SpaceChat reconnect in the background while you are both here.', note: 'It only keeps phone-to-phone links running.' },
]

export function Permissions() {
  return (
    <LegalLayout kicker="Permissions" title={['Every permission,', 'and why.']} intro="SpaceChat asks Android for these, and only when a feature needs them. The names are Android’s; the exact prompts you see vary by Android version.">
      <div className="perms">
        {PERMS.map((p) => (
          <section key={p.name} className="perm">
            <h2>{p.name}</h2>
            <p className="mono perm__id">{p.android}</p>
            <p>{p.why}</p>
            <p className="perm__note">{p.note}</p>
          </section>
        ))}
      </div>
      <section>
        <h2>Installing from your browser</h2>
        <p>Allowing your browser to install apps is an Android setting, not a SpaceChat permission. The <Link className="tlink" to="/terms">terms</Link> describe that choice.</p>
      </section>
    </LegalLayout>
  )
}

export function Notices() {
  const rows = [
    ['React Native', 'MIT License', 'Meta Platforms, Inc. and affiliates'],
    ['SQLite', 'Public domain', 'The SQLite developers'],
    ['SQLCipher', 'BSD-style license', 'Zetetic LLC'],
    ['Space Grotesk', 'SIL Open Font License 1.1', 'Florian Karsten'],
    ['Inter', 'SIL Open Font License 1.1', 'Rasmus Andersson'],
    ['Space Mono', 'SIL Open Font License 1.1', 'Colophon Foundry'],
  ]
  return (
    <LegalLayout kicker="Notices" title={['Built on', 'other people’s work.']} intro="SpaceChat and this website include open-source software and typefaces. Each keeps its own license and copyright.">
      <div className="notices">
        {rows.map(([n, l, o]) => (
          <div key={n} className="notice">
            <h2>{n}</h2>
            <p className="mono">{l}</p>
            <p>{o}</p>
          </div>
        ))}
      </div>
      <section>
        <h2>Trademarks</h2>
        <p>Android is a trademark of Google LLC. Other product names belong to their owners and are used only to describe what SpaceChat works with.</p>
      </section>
    </LegalLayout>
  )
}
