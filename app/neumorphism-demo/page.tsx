import NeumorphismDemo from '../../components/NeumorphismDemo';

export default function NeumorphismDemoPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Neumorphism Design System</h1>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Entdecken Sie verschiedene Neumorphism-Design-Varianten mit unterschiedlichen Farbpaletten. 
            Klicken Sie auf die Varianten, um zwischen den verschiedenen Stilen zu wechseln.
          </p>
        </div>
        
        <NeumorphismDemo />
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-6">Wie funktioniert Neumorphism?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="neumorph-card">
              <h3 className="text-xl font-semibold mb-3">1. Schatten-System</h3>
              <p className="text-sm opacity-80">
                Zwei Schatten werden verwendet: ein heller Schatten für die "erhabene" Seite und ein dunkler Schatten für die "eingedrückte" Seite.
              </p>
            </div>
            <div className="neumorph-card">
              <h3 className="text-xl font-semibold mb-3">2. Farbharmonie</h3>
              <p className="text-sm opacity-80">
                Die Schatten-Farben werden aus der Hintergrundfarbe abgeleitet, um eine natürliche Harmonie zu schaffen.
              </p>
            </div>
            <div className="neumorph-card">
              <h3 className="text-xl font-semibold mb-3">3. Interaktivität</h3>
              <p className="text-sm opacity-80">
                Beim Drücken werden die Schatten invertiert, um einen "eingedrückten" Effekt zu erzeugen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 