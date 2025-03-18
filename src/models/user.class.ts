export class User {
  id: string = ''; // ID des Benutzers
  firstName: string = ''; // Vorname
  lastName: string = ''; // Nachname
  email: string = ''; // E-Mail
  zipCode: number = 0; // Postleitzahl
  city: string = ''; // Stadt
  birthDate: number = 0; // Geburtsdatum als Zeitstempel
  street: string = ''; // Straße

  constructor(init?: Partial<User>) {
    Object.assign(this, init); // Erlaubt das einfache Initialisieren des User-Objekts
  }

  // Gibt die Benutzerdaten als JSON zurück
  toJSON() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      zipCode: this.zipCode,
      city: this.city,
      birthDate: this.birthDate,
      street: this.street,
      id: this.id, // ID in die JSON-Ausgabe einfügen
    };
  }
}
