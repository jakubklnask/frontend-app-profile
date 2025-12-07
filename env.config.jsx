import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const config = {
  pluginSlots: {
    // Twoje istniejące pluginy dla header logo
    'org.openedx.frontend.layout.header_logo.v1': {
      keepDefault: false,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'custom_logo_component',
            type: DIRECT_PLUGIN,
            RenderWidget: () => (
              <h1 style={{textAlign: 'center'}}>🗺️</h1>
            ),
          },
        },
      ]
    },
    // Usuwanie przycisków z desktop header
    'org.openedx.frontend.layout.header_desktop_main_menu.v1': {
      keepDefault: false,
      plugins: []
    },
    // Usuwanie przycisków z mobile header
    'org.openedx.frontend.layout.header_mobile_main_menu.v1': {
      keepDefault: false,
      plugins: []
    },
    // Ukryj widget sidebar (LookingForChallengeWidget)
    'org.openedx.frontend.learner_dashboard.widget_sidebar.v1': {
      keepDefault: false,  // To ukryje domyślny LookingForChallengeWidget
      plugins: []  // Pusta tablica = żadnych custom pluginów, po prostu ukryj wszystko
    },

     // Custom footer (sticky jak domyślny)
    'org.openedx.frontend.layout.footer.v1': {
      plugins: [
        {
          // Ukryj domyślny footer
          op: PLUGIN_OPERATIONS.Hide,
          widgetId: 'default_contents',
        },
        {
          // Wstaw custom footer
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'custom_footer',
            type: DIRECT_PLUGIN,
            RenderWidget: () => (
              <footer style={{
                backgroundColor: '#2c3e50',
                color: 'white',
                padding: '2rem',
                textAlign: 'center',
                width: '100%',
                marginTop: 'auto' // To sprawia że idzie na dół jak domyślny
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '2rem',
                  maxWidth: '1200px',
                  margin: '0 auto',
                  flexWrap: 'wrap'
                }}>
                  <a href="/privacy" style={{color: 'white', textDecoration: 'none'}}>
                    Polityka Prywatności
                  </a>
                  <a href="/about" style={{color: 'white', textDecoration: 'none'}}>
                    O nas
                  </a>
                  <a href="/contact" style={{color: 'white', textDecoration: 'none'}}>
                    Kontakt
                  </a>
                </div>
                <p style={{marginTop: '1rem', marginBottom: 0, fontSize: '0.9rem', opacity: 0.8}}>
                  © 2025 Nask EduTechnologie
                </p>
              </footer>
            ),
          },
        },
      ]
    }
  },
}

export default config;