import './PrivacyPolicy.css';

export default function PrivacyPolicy() {
  return (
    <div className="privacy-body">
      <div className="privacy-updated">Dernière mise à jour : juin 2026</div>

      <h2>Qui sommes-nous ?</h2>
      <p>Calendrier 2k26 est une application de révisions scolaires destinée aux collégiens. Elle est éditée à titre personnel par son créateur.</p>

      <h2>Quelles données sont collectées ?</h2>
      <ul>
        <li>Adresse e-mail et prénom (pour créer ton compte)</li>
        <li>Ta progression dans le cahier de vacances, ton planning, tes recettes favorites</li>
        <li>Les réponses, photos ou PDF que tu envoies pour la correction par IA</li>
        <li>L'historique de tes corrections, tes notes, ton niveau, ton expérience (XP) et tes succès</li>
        <li>Les messages que tu échanges avec l'assistant IA</li>
      </ul>

      <h2>Comment ces données sont-elles utilisées ?</h2>
      <p>Ces données servent uniquement à faire fonctionner l'application : sauvegarder ta progression, te permettre de te reconnecter, et générer tes corrections personnalisées. Elles ne sont jamais vendues ni utilisées à des fins publicitaires.</p>

      <h2>Qui peut voir ces données ?</h2>
      <p>Toi seul(e) peux voir tes propres données. Un administrateur de l'application peut, en cas de besoin (support, modération), consulter la liste des comptes et leur date d'inscription, mais pas le contenu détaillé de ta progression sans action explicite de ta part (sauf pour réinitialiser ta progression ou t'envoyer un message à ta demande ou en cas de problème).</p>

      <h2>Intelligence artificielle</h2>
      <p>Lorsque tu envoies une réponse, une photo ou une question à l'assistant IA, ce contenu est transmis de manière sécurisée au fournisseur d'intelligence artificielle Anthropic (Claude) uniquement pour générer la correction ou la réponse demandée. Ce contenu n'est pas utilisé par Anthropic pour entraîner ses modèles dans le cadre de notre utilisation de leur API.</p>

      <h2>Où sont stockées les données ?</h2>
      <p>Toutes les données sont stockées sur Google Firebase (Firestore et Storage), avec des règles de sécurité garantissant que chaque utilisateur n'accède qu'à ses propres données.</p>

      <h2>Pas de publicité, pas de tracking</h2>
      <p>Cette application ne contient aucune publicité, aucun outil de suivi publicitaire, et aucun partage de données avec des réseaux sociaux ou des régies publicitaires.</p>

      <h2>Utilisateurs mineurs</h2>
      <p>Cette application est conçue pour des élèves de collège. Si tu as moins de 15 ans, l'accord d'un parent ou tuteur légal est recommandé avant de créer un compte. Un parent peut demander la suppression du compte de son enfant à tout moment.</p>

      <h2>Suppression de tes données</h2>
      <p>Tu peux demander la suppression complète de ton compte et de toutes tes données à tout moment, en contactant l'administrateur de l'application via les coordonnées fournies lors de l'inscription.</p>

      <h2>Contact</h2>
      <p>Pour toute question concernant tes données personnelles, contacte l'administrateur de l'application.</p>
    </div>
  );
}
