/**
 * Standalone major projects (outside the Spense production work).
 */

export const aadhaar = {
  id: "aadhaar",
  title: "MULTIMODAL IDENTITY VERIFICATION",
  project: "AI-Based Aadhaar Verification System",
  summary:
    "A biometric authentication system for users unable to use fingerprint or retina scans.",
  face: {
    label: "FACE",
    tech: "FaceNet",
    match: "95%",
    flow: ["Camera", "OpenCV", "FaceNet", "Face similarity"],
  },
  voice: {
    label: "VOICE",
    tech: "MFCC + Cosine Similarity",
    match: "92%",
    flow: ["Microphone", "MFCC", "Cosine Similarity", "Voice verification"],
  },
  combined: "FACE + VOICE → VERIFICATION",
  stack: ["Python", "Flask", "React.js", "TensorFlow", "OpenCV"],
} as const;

export const annamrutha = {
  id: "annamrutha",
  title: "FOOD. PEOPLE. IMPACT.",
  project: "Annamrutha — Food Donation & Management Platform",
  summary:
    "An end-to-end Django application connecting donors, NGOs, and volunteers.",
  features: ["Live tracking", "Receipts", "RBAC authentication"],
  stack: ["Python", "Django", "MySQL", "JavaScript"],
  journey: ["Donor", "Food Donation", "NGO", "Volunteer", "Delivery"],
} as const;
