# Placeboware Application

Create a functional application that sends data in near real-time with 3 different personas keeping the information secure and reliable.

# Background

In the United States, the Federal Drug Administration (FDA) approves medications for specific use cases, if the medication is both effective and safe. To prove the safety and effectiveness of a new drug, pharmaceutical companies conduct multi-phase clinical trials in collaboration with healthcare providers and under the oversight of the FDA. For a successful study, all three parties need to exchange data in a controlled and auditable manner. For example, a healthcare provider needs to be able to identify their patient and track treatment. Still, they should not know whether the patient is part of the treatment group (receiving the actual medication) or the control group (receiving a placebo or established medication). On the other hand, the FDA and pharma companies need this information but generally do not need to know a patient's personally identifiable information (PII), such as their name, date of birth, or address. In the interest of patient privacy, PII should be redacted before it is transmitted by a healthcare provider. At the same time, it is important that the FDA can verify the integrity of study data. The technical means used to transfer data should make it impossible to - for example - remove a study participant or manipulate laboratory data to improve the chances of approval for a new medication. While we generally believe in the moral integrity of humans, this is a real risk given the cost of developing a new drug (~$1B). Especially when the drug maker has to show that the medication is more effective than existing alternatives.

# The Goal

The goal of this project was to build a proof of concept distributed information system with suitable user interfaces that could be used by the FDA, pharmaceutical companies, and participating healthcare providers to exchange study data as it is produced (i.e., in near real-time) in a secure, trusted (i.e., auditable), and controlled (i.e., minimally permissive) manner. We built our information system on top of the Vendia Share platform, which supports data exchange through an immutable, cryptographically verifiable, distributed ledger and provides the primitives to control data flow (e.g., redaction). 

# Technical Stack

Front End - React 
Back End - Vendia Client SDK utilizes an entirely serverless architecture
Authentication & Authorization - Firebase
