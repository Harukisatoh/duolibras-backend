const Firebase = require("../integrations/firebase");

// Utils
// There's a explanation inside the file addressing why this wrapper is necessary
const firebaseAuthWrapper = require("../utils/firebaseAuthWrapper");

class FirebaseService {
  static timestamp = Firebase.database.ServerValue.TIMESTAMP;

  static async authWithFacebook(token) {
    const credential = Firebase.auth.FacebookAuthProvider.credential(token);

    const response = await Firebase.auth().signInWithCredential(credential);
    const user = response.user.toJSON();

    // Removes secrets from response
    delete user["apiKey"];
    delete user["appName"];
    delete user["authDomain"];
    delete user["stsTokenManager"]["apiKey"];

    return user;
  }

  static async signUpWithEmail(email, password) {
    const response = await firebaseAuthWrapper(
      Firebase.auth().createUserWithEmailAndPassword(email, password)
    );

    const user = response.user.toJSON();

    // Removes secrets from response
    delete user["apiKey"];
    delete user["appName"];
    delete user["authDomain"];
    delete user["stsTokenManager"]["apiKey"];

    return user;
  }

  static async signInWithEmail(email, password) {
    const response = await firebaseAuthWrapper(
      Firebase.auth().signInWithEmailAndPassword(email, password)
    );

    const user = response.user.toJSON();

    // Removes secrets from response
    delete user["apiKey"];
    delete user["appName"];
    delete user["authDomain"];
    delete user["stsTokenManager"]["apiKey"];

    return user;
  }

  static async signOut() {
    await firebaseAuthWrapper(Firebase.auth().signOut());
  }

  static async resetEmailPassword(email) {
    await firebaseAuthWrapper(Firebase.auth().sendPasswordResetEmail(email));
  }

  static async checkIfUserDbIsAlreadyCreate(user) {
    const response = await Firebase.database()
      .ref(`userDetails/${user.uid}`)
      .once("value", (snapshot) => snapshot);

    if (response.exists()) {
      return true;
    } else {
      return false;
    }
  }

  static async initializeUserDb(user) {
    await Promise.all([
      this.initializeUserInfo(user),
      this.initializeUserProgress(user),
      this.initializeUserBadges(user),
      this.initializeUserInventory(user),
    ]);
  }

  static async initializeUserInfo(user) {
    const defaultUserInfo = {
      name: user.displayName || "Usuário",
      avatar: user.photoURL || "",
      signedUpAt: new Date().toISOString(),
      experience: 0,
      money: 0,
      appTheme: "light",
    };

    await Firebase.database()
      .ref()
      .child(`userDetails/${user.uid}`)
      .set(defaultUserInfo);
  }

  static async initializeUserProgress(user) {
    const lecturesSnapshot = await Firebase.database()
      .ref("lectures")
      .once("value", (snapshot) => snapshot);

    const lecturesId = Object.keys(lecturesSnapshot.val());
    const userProgress = {};
    const emptyLectureProgress = {
      unlocked: false,
      completed: false,
      currentLevel: 0,
    };

    lecturesId.forEach((lectureId) => {
      userProgress[lectureId] = emptyLectureProgress;
    });

    await Firebase.database()
      .ref()
      .child(`userProgress/${user.uid}`)
      .set(userProgress);
  }

  static async initializeUserBadges(user) {
    const badgesSnapshot = await Firebase.database()
      .ref("badges")
      .once("value", (snapshot) => snapshot);

    const badgesId = Object.keys(badgesSnapshot.val());
    const userBadges = {};
    const notAchievedBadge = {
      achieved: false,
      quantity: 0,
    };

    badgesId.forEach((badgeId) => {
      userBadges[badgeId] = notAchievedBadge;
    });

    await Firebase.database()
      .ref()
      .child(`userBadges/${user.uid}`)
      .set(userBadges);
  }

  static async initializeUserInventory(user) {
    const storeSnapshot = await Firebase.database()
      .ref("store")
      .once("value", (snapshot) => snapshot);

    const storeItemsId = Object.keys(storeSnapshot.val());
    const userInventory = {};
    const notPurchasedItem = { purchased: false };

    storeItemsId.forEach((itemId) => {
      userInventory[itemId] = notPurchasedItem;
    });

    await Firebase.database()
      .ref()
      .child(`userInventory/${user.uid}`)
      .set(userInventory);
  }
}

module.exports = FirebaseService;
