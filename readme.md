## Test Architecture (Playwright + Page Object Model)

Tests interact with the application through Page Objects.
Each test file uses a dedicated Page Object which communicates with the Playwright page instance.

# Test flow:
flowchart LR

    subgraph Test_Files
        T1[Login Test]
        T2[Dashboard Test]
        T3[Profile Test]
    end

    subgraph Page_Objects
        P1[LoginPage]
        P2[DashboardPage]
        P3[ProfilePage]
    end

    subgraph Playwright
        B1[Page Instance]
    end

    T1 --> P1 --> B1
    T2 --> P2 --> B1
    T3 --> P3 --> B1